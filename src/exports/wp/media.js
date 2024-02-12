import { fetch_and_parse, fetch_data } from '../utils/index.js';
import { post_edit_base, post_embed, post_view, renderable_item } from './schema.js';
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
		return fetch( `${ url }/wp/v2/media`, {
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
 * @param {string} url WordPress API root URL.
 * @param {string=} auth Authorization header.
 * @param {import('$types').Fetch_Media_Args=} args Request arguments.
 *
 * @throws {Error|import('zod').ZodError}
 *
 * @return {Promise<WP_Media[]>} Media data.
 */
export async function get_media( url, auth = '', args = undefined ) {
	return fetch_and_parse( media_view.array(), () => fetch_data( `${ url }/wp/v2/media`, auth, args ) );
}

/**
 * Get single media
 *
 * @since 0.2.0
 *
 * @param {number} id Media ID.
 * @param {string} url WordPress API root URL.
 * @param {string=} auth Authorization header.
 *
 * @throws {Error|import('zod').ZodError}
 *
 * @return {Promise<WP_Media>} Media data.
 */
export async function get_single_media( id, url, auth = '' ) {
	return fetch_and_parse( media_view, () => fetch_data( `${ url }/wp/v2/media/${ id }`, auth ) );
}
