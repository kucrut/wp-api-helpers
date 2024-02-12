import { fetch_and_parse, fetch_data, generate_endpoint_url, pick_schema } from '../utils/index.js';
import { link_item, meta } from './schema.js';
import { z } from 'zod';

export const term_embed = z.object( {
	id: z.number().min( 1 ),
	link: z.string(),
	name: z.string(),
	slug: z.string(),
	taxonomy: z.string(),
	_links: z.object( {
		'about': link_item,
		'collection': link_item,
		'self': link_item,
		'wp:post_type': link_item,
	} ),
} );

export const term_view = term_embed.extend( {
	meta,
	count: z.number(),
	description: z.string(),
	parent: z.number(),
} );

/** @typedef {z.infer<term_view>} WP_Term */
/** @typedef {z.infer<term_embed>} WP_Term_Embed */
/** @typedef {z.infer<term_view>} WP_Term_Edit */

/**
 * Generate URL for user requests
 *
 * @param {string} url WP API root URL.
 * @param {string} taxonomy Taxonomy's rest_base.
 * @param {import('$types').Context_Arg=} context Request context.
 * @param {number=} id Term ID.
 *
 * @return {URL} Endpoint URL.
 */
function generate_url( url, taxonomy, context = undefined, id = undefined ) {
	return generate_endpoint_url( `${ url }/wp/v2/${ taxonomy }`, context, id );
}

/**
 * Get taxonomy terms
 *
 * @since 0.1.0
 *
 * @template {import('$types').Context_Arg} C
 *
 * @param {string} url WordPress API root URL.
 * @param {string} taxonomy Taxonomy's rest_base.
 * @param {string=} auth Authorization header.
 * @param {C=} context Request context, defaults to 'view'.
 * @param {import("$types").Fetch_Terms_Args=} args Request arguments.
 *
 * @throws {Error|import('zod').ZodError}
 *
 * @return {Promise<z.infer<import('$types').Schema_By_Context<C, typeof term_view, typeof term_embed, typeof term_view>>[]>} Term collection.
 */
export async function get_terms( url, taxonomy, auth = '', context = undefined, args = undefined ) {
	const schema = pick_schema( term_view, term_embed, term_view, context ).array();

	return fetch_and_parse( schema, () => fetch_data( generate_url( url, taxonomy, context ), auth, args ) );
}
