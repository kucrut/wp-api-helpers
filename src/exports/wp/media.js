import { fetch_and_parse } from '../utils/index.js';
import { media_edit } from './schema.js';

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
