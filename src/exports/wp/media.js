import { make_response_handler } from '../utils/index.js';
import { media } from './schema.js';

/**
 * Create media
 *
 * @since 0.1.0
 *
 * @param {string}   url  WordPress API root URL.
 * @param {string}   auth Autorization header.
 * @param {FormData} data Form data.
 *
 * @return {Promise<Response>} Fetch response.
 */
export function create_media( url, auth, data ) {
	return fetch( `${ url }/wp/v2/media`, {
		body: data,
		method: 'POST',
		headers: {
			Accept: 'application/json',
			Authorization: auth,
		},
	} );
}

/**
 * Create media (parsed)
 *
 * @since 0.1.0
 *
 * @type {import('$types').HandledFetch<create_media, import('./schema').Media>}
 */
export async function create_media_parsed( ...args ) {
	return make_response_handler( async data => {
		const parsed = media.parse( data );
		// Some properties (for example terms) are not defined in our schema
		// so we need to merge them back in.
		// TODO: Perhaps find a better and safer way to do this.
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		return { ...data, ...parsed };
	} )( await create_media( ...args ) );
}
