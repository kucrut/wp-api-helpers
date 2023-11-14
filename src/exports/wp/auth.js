import { jwt_auth_data, jwt_valid_token } from './schema.js';
import { make_response_handler } from '../utils/index.js';

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
 * @type {import('$types').HandledFetch<fetch_jwt_auth, import('./schema').JWT_Auth_Data>}
 */
export async function get_jwt_auth( ...args ) {
	return make_response_handler( async data => jwt_auth_data.parse( data ) )( await fetch_jwt_auth( ...args ) );
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
