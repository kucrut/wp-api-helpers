import { user_view } from './schema.js';
import { fetch_and_parse, fetch_data } from '../utils/index.js';

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
 * Get self user data
 *
 * @since 0.1.0
 *
 * @param {string} url WordPress API root URL.
 * @param {string} auth Authorization header.
 *
 * @throws {Error|import('zod').ZodError}
 *
 * @return {Promise<import('./schema.js').User_View>} User (view) data.
 */
export function get_me( url, auth ) {
	return fetch_and_parse( user_view, () => fetch_data( `${ url }/wp/v2/users/me`, auth ) );
}
