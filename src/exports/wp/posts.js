import {
	comment_ping_status,
	date_item,
	link_item,
	meta,
	renderable_item,
	taxonomy_view,
	term_view,
} from './schema.js';
import { fetch_and_parse, fetch_data, pick_schema } from '../utils/index.js';
import { z } from 'zod';

export const post_edit_base = z.object( {
	generated_slug: z.string(),
	permalink_template: z.string(),
} );

export const post_embed = z.object( {
	author: z.number().min( 1 ),
	date: date_item,
	excerpt: renderable_item,
	featured_media: z.number(),
	id: z.number(),
	link: z.string().url(),
	slug: z.string(),
	title: renderable_item,
	type: z.string(),
	_links: z.record( link_item ).optional(),
} );

export const post_view = post_embed.extend( {
	meta,
	comment_status: comment_ping_status,
	content: renderable_item,
	date_gmt: date_item,
	format: z.string().optional(),
	menu_order: z.number().optional(),
	modified: date_item,
	modified_gmt: date_item,
	parent: z.number().optional(),
	ping_status: comment_ping_status,
	status: z.string(),
	sticky: z.boolean().optional(),
	template: z.string(),
	guid: z.object( {
		raw: z.string().url().optional(),
		rendered: z.string().url(),
	} ),
} );

export const post_edit = post_view.merge( post_edit_base );

/** @typedef {z.infer<typeof post_view>} WP_Post */
/** @typedef {z.infer<typeof post_edit>} WP_Post_Edit */
/** @typedef {z.infer<typeof post_embed>} WP_Post_Embed */
/* TODO */
/** @typedef {{taxonomy: z.infer<typeof taxonomy_view>, terms: z.infer<typeof term_view>[]}} WP_Post_Terms */

/**
 * Generate URL for posts requests
 *
 * @param {string} url WP API root URL.
 * @param {string=} type Post type, defaults to 'posts'.
 * @param {import('$types').Context_Arg} context Request context.
 * @param {number=} id Media ID.
 *
 * @return {URL} Endpoint URL.
 */
function generate_url( url, type, context = undefined, id = undefined ) {
	let endpoint = `${ url }/wp/v2/${ type }`;

	if ( id ) {
		endpoint = `${ endpoint }/${ id }`;
	}

	const endpoint_url = new URL( endpoint );

	if ( context ) {
		endpoint_url.searchParams.append( 'context', context );
	}

	return endpoint_url;
}

/**
 * Get single post
 *
 * @since 0.2.0
 *
 * @template {import('$types').Context_Arg} C
 *
 * @param {number} id Post ID (optional).
 * @param {string} url WordPress API root URL.
 * @param {string=} auth Authorization header.
 * @param {string=} type Post type, defaults to 'posts'.
 * @param {C=} context Request context, defaults to 'view'.
 *
 * @todo Add args parameter.
 *
 * @throws {Error|z.ZodError}
 *
 * @return {Promise<z.infer<import('$types').Schema_By_Context<C, typeof post_view, typeof post_embed, typeof post_edit>>>} Single media data.
 */
export async function get_post( id, url, auth = '', type = 'posts', context = undefined ) {
	const schema = pick_schema( post_view, post_embed, post_edit, context );

	return fetch_and_parse( schema, () => fetch_data( generate_url( url, type, context, id ), auth ) );
}

/**
 * Get posts
 *
 * @since 0.2.0
 *
 * @param {string} url WordPress API root URL.
 * @param {string=} auth Authorization header.
 * @param {string=} type Post type, defaults to 'posts'.
 * @param {import('$types').Fetch_Posts_Args=} args Request arguments
 *
 * @throws {Error|import('zod').ZodError}
 *
 * @return {Promise<import('zod').infer<typeof post_view>[]>} Post data.
 */
export async function get_posts( url, auth = '', type = 'posts', args = undefined ) {
	return fetch_and_parse( post_view.array(), () => fetch_data( `${ url }/wp/v2/${ type }`, auth, args ) );
}

/**
 * Get post terms
 *
 * @since 0.2.0
 *
 * @param {import('zod').infer<typeof post_view>} post Post object.
 * @param {string=} auth Authorization header (optional).
 *
 * @return {Promise<WP_Post_Terms[]|null>} Array of post terms.
 */
export async function get_post_terms( post, auth = '' ) {
	if ( ! post._links ) {
		// eslint-disable-next-line no-console
		console.warn( 'get_post_terms(): Post object is missing `_links`.', post );
		return null;
	}

	const taxonomies = post._links[ 'wp:term' ];

	if ( ! ( Array.isArray( taxonomies ) && taxonomies.length ) ) {
		return null;
	}

	/** @type {WP_Post_Terms[]} */
	const result = [];

	for ( const tax of taxonomies ) {
		try {
			const terms = await fetch_and_parse( term_view.array(), () => fetch_data( tax.href, auth ) );

			if ( ! terms.length ) {
				continue;
			}

			const taxonomy = await fetch_and_parse( taxonomy_view, () => {
				return fetch_data( terms[ 0 ]._links.about[ 0 ].href, auth );
			} );

			result.push( { taxonomy, terms } );
		} catch ( error ) {
			// eslint-disable-next-line no-console
			console.error( 'get_post_terms():', error );
		}
	}

	return result;
}
