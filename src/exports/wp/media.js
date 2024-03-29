import { fetch_and_parse, fetch_data, generate_endpoint_url, get_fetch, pick_schema } from '../utils/index.js';
import { post_edit_base, post_embed, post_view } from './posts.js';
import { renderable_item } from './schema.js';
import { z } from 'zod';

export const image_size = z.object( {
	file: z.string(),
	height: z.number(),
	mime_type: z.string(),
	source_url: z.string(),
	width: z.number(),
} );

export const media_embed = post_embed
	.omit( {
		excerpt: true,
		featured_media: true,
	} )
	.extend( {
		alt_text: z.string(),
		caption: renderable_item,
		media_type: z.string(),
		media_details: z.object( {
			bitrate: z.number().optional(), // Video.
			dataformat: z.string().optional(), // Video.
			file: z.string().optional(), // Image.
			fileformat: z.string().optional(), // Video.
			filesize: z.number(), // Image.
			height: z.number().optional(), // Image.
			image_meta: z.record( z.any() ).optional(), // Image.
			length: z.number().optional(), // Video.
			length_formatted: z.string().optional(), // Video.
			width: z.number().optional(), // Image.
			sizes: z.record( image_size ).optional(), // Image.
		} ),
		mime_type: z.string(),
		source_url: z.string().url(),
	} );

export const media_view = z
	.object( {
		description: renderable_item,
		post: z.number().nullable(),
	} )
	.merge( post_view )
	.merge( media_embed )
	.omit( {
		content: true,
		excerpt: true,
		featured_media: true,
		menu_order: true,
		parent: true,
		sticky: true,
	} );

export const media_edit = media_view.merge( post_edit_base );

/** @typedef {z.infer<typeof image_size>} WP_Image_Size */
/** @typedef {z.infer<typeof media_view>} WP_Media */
/** @typedef {z.infer<typeof media_edit>} WP_Media_Edit */
/** @typedef {z.infer<typeof media_embed>} WP_Media_Embed */

/**
 * Generate URL for media requests
 *
 * @param {string} url WP API root URL.
 * @param {import('$types').Context_Arg=} context Request context, defaults to 'view'
 * @param {number=} id Media ID.
 *
 * @return {URL} Endpoint URL.
 */
function generate_url( url, context = undefined, id = undefined ) {
	return generate_endpoint_url( `${ url }/wp/v2/media`, context, id );
}

/**
 * Create media
 *
 * @since 0.1.0
 *
 * @param {string}   url  WordPress API root URL.
 * @param {string}   auth Autorization header.
 * @param {FormData} data Form data.
 *
 * @return {Promise<WP_Media_Edit>} Media (edit) data.
 */
export function create_media( url, auth, data ) {
	return fetch_and_parse( media_edit, () => {
		return get_fetch()( `${ url }/wp/v2/media`, {
			body: data,
			method: 'POST',
			headers: {
				Accept: 'application/json',
				Authorization: auth,
			},
		} );
	} );
}

/**
 * Get media
 *
 * @since 0.2.0
 *
 * @template {import('$types').Context_Arg} C
 *
 * @param {string} url WordPress API root URL.
 * @param {string=} auth Authorization header.
 * @param {C=} context Request context, defaults to 'view'.
 * @param {import('$types').Fetch_Media_Args=} args Request arguments.
 *
 * @throws {Error|z.ZodError}
 *
 * @return {Promise<z.infer<import('$types').Schema_By_Context<C, typeof media_view, typeof media_embed, typeof media_view>>[]>} Media collection.
 */
export async function get_media( url, auth = '', context = undefined, args = undefined ) {
	const schema = pick_schema( media_view, media_embed, media_edit, context ).array();

	return fetch_and_parse( schema, () => fetch_data( generate_url( url, context ), auth, args ) );
}

/**
 * Get single media
 *
 * @since 0.2.0
 *
 * @template {import('$types').Context_Arg} C
 *
 * @param {number} id Media ID.
 * @param {string} url WordPress API root URL.
 * @param {string=} auth Authorization header.
 * @param {C=} context Request context, defaults to 'view'.
 *
 * @throws {Error|z.ZodError}
 *
 * @return {Promise<z.infer<import('$types').Schema_By_Context<C, typeof media_view, typeof media_embed, typeof media_edit>>>} Single media data.
 */
export async function get_single_media( id, url, auth = '', context = undefined ) {
	const schema = pick_schema( media_view, media_embed, media_edit, context );

	return fetch_and_parse( schema, () => fetch_data( generate_url( url, context, id ), auth ) );
}
