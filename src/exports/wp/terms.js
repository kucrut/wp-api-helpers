import { fetch_and_parse, fetch_data } from '../utils/index.js';
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
 * Get taxonomy terms
 *
 * @since 0.1.0
 *
 * @param {string} url WordPress API root URL.
 * @param {string} taxonomy Taxonomy's rest_base.
 * @param {string=} auth Authorization header.
 * @param {import("$types").Fetch_Terms_Args=} args Request arguments.
 *
 * @throws {Error|import('zod').ZodError}
 *
 * @return {Promise<import('zod').infer<typeof term_view>[]>} Terms (view) data.
 */
export async function get_terms( url, taxonomy, auth, args ) {
	return fetch_and_parse( term_view.array(), () => fetch_data( `${ url }/wp/v2/${ taxonomy }`, auth, args ) );
}
