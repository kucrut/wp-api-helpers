import { fetch_and_parse, fetch_data } from '../utils/index.js';
import { media_edit, media_view } from './schema.js';

/**
 * Create media
 *
 * @since 0.1.0
 *
 * @param {string}   url  WordPress API root URL.
 * @param {string}   auth Autorization header.
 * @param {FormData} data Form data.
 *
 * @return {Promise<import('zod').infer<typeof media_edit>>} Media (edit) data.
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
 * @return {Promise<import('zod').infer<typeof media_view>[]>} Media data.
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
 * @return {Promise<import('zod').infer<typeof media_view>>} Media data.
 */
export async function get_single_media( id, url, auth = '' ) {
	return fetch_and_parse( media_view, () => fetch_data( `${ url }/wp/v2/media/${ id }`, auth ) );
}
