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
 * Log in to WordPress via JWT
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
export async function jwt_login( { url, username, password } ) {
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

	return response;
}
