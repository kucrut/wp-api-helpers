import { user } from './schema.js';
import { make_response_handler } from '../utils/index.js';

/**
 * Fetch own user data
 *
 * @since 0.1.0
 *
 * @param {string} url WordPress API root URL.
 * @param {string} auth Autorization header.
 *
 * @throws {Error}
 *
 * @return {Promise<Response>} Fetch response.
 */
export function fetch_me( url, auth ) {
	return fetch( `${ url }/wp/v2/users/me`, {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Authorization': auth,
			'Content-Type': 'application/json',
		},
	} );
}

/**
 * Get JWT authentication
 *
 * @type {import('$types').HandledFetch<fetch_me, import('./schema').User>}
 */
export async function get_me( ...args ) {
	return make_response_handler( async data => user.parse( data ) )( await fetch_me( ...args ) );
}
