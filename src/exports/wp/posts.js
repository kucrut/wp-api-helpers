import * as v from 'valibot';
import { CommentStatusSchema, DateItemSchema, IdSchema, LinkItemSchema, MetaSchema, RenderableItemSchema, UrlSchema } from './schema.js';
import { fetch_and_parse, fetch_data, generate_endpoint_url } from '../utils/index.js';
import { TaxonomyViewSchema } from './taxonomies.js';
import { TermViewSchema } from './terms.js';

export const PostEditBaseSchema = v.object( {
	generated_slug: v.string(),
	permalink_template: v.string(),
} );

/** @typedef {v.InferOutput<typeof PostEmbedSchema>} WP_Post_Embed */
export const PostEmbedSchema = v.object( {
	author: IdSchema,
	date: DateItemSchema,
	excerpt: RenderableItemSchema,
	featured_media: v.number(),
	id: v.number(),
	link: UrlSchema,
	slug: v.string(),
	title: RenderableItemSchema,
	type: v.string(),
	_links: v.optional( v.record( v.string(), LinkItemSchema ) ),
} );

/** @typedef {v.InferOutput<typeof PostViewSchema>} WP_Post */
export const PostViewSchema = v.object( v.entriesFromObjects( [
	PostEmbedSchema,
	v.object( {
		comment_status: CommentStatusSchema,
		content: RenderableItemSchema,
		date_gmt: DateItemSchema,
		format: v.optional( v.string() ),
		menu_order: v.optional( v.number() ),
		meta: MetaSchema,
		modified: DateItemSchema,
		modified_gmt: DateItemSchema,
		parent: v.optional( v.number() ),
		ping_status: CommentStatusSchema,
		status: v.string(),
		sticky: v.optional( v.boolean() ),
		template: v.string(),
		guid: v.object( {
			raw: v.optional( UrlSchema ),
			rendered: UrlSchema,
		} ),
	} ),
] ) );

/** @typedef {v.InferOutput<typeof PostEditSchema>} WP_Post_Edit */
export const PostEditSchema = v.object( v.entriesFromObjects( [
	PostViewSchema,
	PostEditBaseSchema,
] ) );

const PostQuerySchemas = {
	edit: PostEditSchema,
	embed: PostEmbedSchema,
	view: PostViewSchema,
};

/** @typedef {{taxonomy: import('./taxonomies.js').WP_Taxonomy, terms: import('./terms.js').WP_Term[] }} WP_Post_Terms */

/**
 * Generate URL for posts requests
 *
 * @param {string} url WP API root URL.
 * @param {string} type Post type, defaults to 'posts'.
 * @param {import('$types').Context_Arg|undefined} context Request context, defaults to 'view'
 * @param {number|undefined} id Media ID.
 *
 * @return {URL} Endpoint URL.
 */
function generate_url( url, type, context = undefined, id = undefined ) {
	return generate_endpoint_url( `${ url }/wp/v2/${ type }`, context, id );
}

/**
 * Get single post
 *
 * @since 0.2.0
 *
 * @template {keyof typeof PostQuerySchemas} C
 *
 * @param {number} id Post ID (optional).
 * @param {string} url WordPress API root URL.
 * @param {C} context Request context, defaults to 'view'.
 * @param {string} auth Authorization header.
 * @param {string} type Post type, defaults to 'posts'.
 *
 * @todo Add args parameter.
 *
 * @throws {Error|v.ValiError}
 *
 * @return {Promise<v.InferOutput<typeof PostQuerySchemas[C]>>} Single post data.
 */
export async function get_single_post( id, url, context, auth = '', type = 'posts' ) {
	return fetch_and_parse(
		PostQuerySchemas[ context ],
		() => fetch_data( generate_url( url, type, context, id ), auth ),
	);
}

/**
 * Get posts
 *
 * @since 0.2.0
 *
 * @template {keyof typeof PostQuerySchemas} C
 *
 * @param {string} url WordPress API root URL.
 * @param {C} context Request context, defaults to 'view'.
 * @param {string} auth Authorization header.
 * @param {string} type Post type, defaults to 'posts'.
 * @param {import('$types').Fetch_Posts_Args|undefined} args Request arguments
 *
 * @throws {Error|v.ValiError}
 *
 * @return {Promise<v.InferOutput<v.ArraySchema<typeof PostQuerySchemas[C], undefined>>>} Post collection.
 */
export async function get_posts(
	url,
	context,
	auth = '',
	type = 'posts',
	args = undefined,
) {
	return fetch_and_parse(
		v.array( PostQuerySchemas[ context ] ),
		// @ts-expect-error TODO
		() => fetch_data( generate_url( url, type, context ), auth, args ),
	);
}

/**
 * Get post terms
 *
 * @since 0.2.0
 *
 * @param {WP_Post} post Post object.
 * @param {string} auth Authorization header (optional).
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
			const terms = await fetch_and_parse(
				v.array( TermViewSchema ),
				() => fetch_data( tax.href, auth ),
			);

			if ( ! terms.length ) {
				continue;
			}

			const taxonomy = await fetch_and_parse( TaxonomyViewSchema, () => {
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
