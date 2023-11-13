import { handle_response } from '../utils/index.js';
import { jwt_auth_data } from './schema.js';

/** @typedef {import('./schema').JWT_Auth_Data} JWT_Auth_Data */

/**
 * Discover WordPress API root URL
 *
 * @since 0.0.1
 *
 * @param {string} url WordPress URL.
 *
 * @throws {Error}
 *
 * @return {Promise<string>} WordPress API root URL.
 */
export async function discover( url ) {
	const response = await fetch( url, {
		method: 'HEAD',
	} );

	if ( ! response.ok ) {
		throw new Error( `HEAD request failed: ${ response.statusText }` );
	}

	const link = response.headers.get( 'Link' );

	if ( ! link ) {
		throw new Error( 'Link header not found.' );
	}

	const match = link.match( /^<(.*)\/>; rel="https:\/\/api.w.org\/"/ );

	if ( ! match ) {
		throw new Error( `Could not find REST API URL from Link header. Are you sure it's a WordPress site?` );
	}

	return match[ 1 ];
}

/**
 * Get JWT authentication
 *
 * @since 0.1.0
 *
 * @see {@link https://wordpress.org/plugins/jwt-authentication-for-wp-rest-api/}
 *
 * @template [T=JWT_Auth_Data]
 *
 * @param {Object} options Options.
 * @param {string} options.url WordPress API root URL.
 * @param {string} options.username Username.
 * @param {string} options.password Password.
 * @param {boolean|import("$types").HandleResponse<T>=} [options.handle=true] Whether or not to handle the response.
 *
 * @throws {Error}
 *
 * @return {Promise<Response|JWT_Auth_Data|T>} Fetch response or handled data.
 */
export async function jwt_auth( options ) {
	const { url, username, password, handle = true } = options;

	const response = await fetch( `${ url }/jwt-auth/v1/token`, {
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

	if ( handle === true ) {
		/** @type {import('$types').HandleResponse<JWT_Auth_Data>} */
		const handler = async data => {
			return jwt_auth_data.parse( data );
		};

		return handle_response( response, handler );
	}

	if ( typeof handle === 'function' ) {
		return handle_response( response, handle );
	}

	return response;
}
