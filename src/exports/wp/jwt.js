import * as v from 'valibot';
import { EmailSchema } from './schema.js';
import { fetch_and_parse, get_fetch } from '../utils/index.js';

/** @typedef {v.InferOutput<typeof JwtAuthDataSchema>} JWT_Auth */
export const JwtAuthDataSchema = v.object( {
	user_email: EmailSchema,
	user_display_name: v.string(),
	user_nicename: v.string(),
	token: v.string(),
} );

/** @typedef {v.InferOutput<typeof JwtValidTokenSchema>} JWT_Valid_Token */
export const JwtValidTokenSchema = v.object( {
	code: v.pipe( v.string(), v.check( val => val === 'jwt_auth_valid_token' ) ),
	data: v.object( {
		status: v.pipe( v.number(), v.check( val => val === 200 ) ),
	} ),
} );

/**
 * Get JWT authentication
 *
 * @since 0.1.0
 *
 * @param {string} url WordPress API root URL.
 * @param {string} username Username or email.
 * @param {string} password User password.
 *
 * @throws {Error|v.ValiError}
 *
 * @return {Promise<JWT_Auth>} Auth data.
 */
export async function get_jwt_auth( url, username, password ) {
	return fetch_and_parse( JwtAuthDataSchema, () => {
		return get_fetch()( `${ url }/jwt-auth/v1/token`, {
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
	return fetch_and_parse( JwtValidTokenSchema, () => {
		return get_fetch()( `${ url }/jwt-auth/v1/token/validate`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${ token }`,
			},
		} );
	} );
}
