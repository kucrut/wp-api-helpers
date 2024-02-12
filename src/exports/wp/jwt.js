import { fetch_and_parse } from '../utils/index.js';
import { z } from 'zod';

export const jwt_auth_data = z.object( {
	user_email: z.string().email(),
	user_display_name: z.string(),
	user_nicename: z.string(),
	token: z.string(),
} );

export const jwt_valid_token = z.object( {
	code: z.string().refine( val => val === 'jwt_auth_valid_token' ),
	data: z.object( {
		status: z.number().refine( val => val === 200 ),
	} ),
} );

/**
 * @typedef {z.infer<typeof jwt_auth_data>} JWT_Auth
 * @typedef {z.infer<typeof jwt_valid_token>} JWT_Valid_Token
 */

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
 * @return {Promise<JWT_Auth>} Auth data.
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
 * Validate JWT token
 *
 * @since 0.1.0
 *
 * @param {string} url WordPress API root URL.
 * @param {string} token JWT token.
 *
 * @return {Promise<JWT_Valid_Token>} Valid token data.
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
