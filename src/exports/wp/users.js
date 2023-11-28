import { user_view } from './schema.js';
import { fetch_and_parse } from '../utils/index.js';

/**
 * Get user data
 *
 * @since 0.1.0
 *
 * @param {string} url WordPress API root URL.
 * @param {number|'me'} id User ID or 'me'.
 * @param {string=} auth Authorization header (required when `id` is `me`).
 *
 * @throws {Error|import('zod').ZodError}
 *
 * @return {Promise<import('zod').infer<typeof user_view>>} User (view) data.
 */
export function get_user( url, id, auth ) {
	if ( typeof id === 'number' && id < 1 ) {
		throw new Error( '[get_user] User ID must be greater than 0.' );
	}

	if ( id === 'me' && ! auth ) {
		throw new Error( '[get_user] auth is required to get self user data.' );
	}

	/** @type {HeadersInit} */
	const headers = { Accept: 'application/json' };

	if ( auth ) {
		headers.Authorization = auth;
	}

	return fetch_and_parse( user_view, () => fetch( `${ url }/wp/v2/users/${ id }`, { headers } ) );
}
