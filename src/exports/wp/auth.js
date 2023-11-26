import { jwt_auth_data, jwt_valid_token } from './schema.js';
import { fetch_and_parse } from '../utils/index.js';

/**
 * Get JWT authentication
 *
 * @since 0.1.0
 *
 * @param {string} url WordPress API root URL.
 * @param {string} username Username or email.
 * @param {string} password Password.
 *
 * @throws {Error|import('zod').ZodError}
 *
 * @return {Promise<import('zod').infer<typeof jwt_auth_data>>} Auth data.
 */
export async function get_jwt_auth( url, username, password ) {
	return fetch_and_parse( jwt_auth_data, () => {
		return fetch( `${ url }/jwt-auth/v1/token`, {
			body: JSON.stringify( { username, password } ),
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
			},
		} );
	} );
}

/**
 * Validate JWT token (fetch only)
 *
 * @since 0.1.0
 *
 * @param {string} url WordPress API root URL.
 * @param {string} token JWT token.
 *
 * @return {Promise<Response>} Fetch response.
 */
export function fetch_jwt_validate_token( url, token ) {
	return fetch( `${ url }/jwt-auth/v1/token/validate`, {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${ token }`,
		},
	} );
}

/**
 * Validate JWT token
 *
 * @since 0.1.0
 *
 * @param {string} url WordPress API root URL.
 * @param {string} token JWT token.
 *
 * @return {Promise<import('zod').infer<typeof jwt_valid_token>>} Valid token data.
 */
export async function get_jwt_validate_token( url, token ) {
	return fetch_and_parse( jwt_valid_token, () => {
		return fetch( `${ url }/jwt-auth/v1/token/validate`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${ token }`,
			},
		} );
	} );
}
