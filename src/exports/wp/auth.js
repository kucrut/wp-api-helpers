import { jwt_auth_data, jwt_valid_token } from './schema.js';
import { fetch_and_parse, make_response_handler } from '../utils/index.js';

/**
 * Fetch JWT authentication
 *
 * @since 0.1.0
 *
 * @see {@link https://wordpress.org/plugins/jwt-authentication-for-wp-rest-api/}
 *
 * @param {Object} credentials Credentials.
 * @param {string} credentials.url WordPress API root URL.
 * @param {string} credentials.username Username.
 * @param {string} credentials.password Password.
 *
 * @throws {Error}
 *
 * @return {Promise<Response>} Fetch response.
 */
export function fetch_jwt_auth( credentials ) {
	const { url, username, password } = credentials;

	return fetch( `${ url }/jwt-auth/v1/token`, {
		method: 'POST',
		body: JSON.stringify( {
			username,
			password,
		} ),
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json',
		},
	} );
}

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
 * @type {import('$types').HandledFetch<fetch_jwt_validate_token, import('./schema').JWT_Valid_Token>}
 */
export async function get_jwt_validate_token( ...args ) {
	return make_response_handler( async data => jwt_valid_token.parse( data ) )(
		await fetch_jwt_validate_token( ...args ),
	);
}
