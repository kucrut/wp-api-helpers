import { make_response_handler, normalize_fetch_args } from '../utils/index.js';

/**
 * Fetch collection
 *
 * @param {string} endpoint Collection endpoint.
 * @param {string=} auth Authentication header.
 * @param {Record<string,any>=} args Arguments.
 *
 * @return {ReturnType<typeof fetch>} Response.
 */
export function fetch_data( endpoint, auth = '', args = undefined ) {
	const url = new URL( endpoint );

	/** @type {HeadersInit} */
	const headers = {
		'Accept': 'application/json',
		'Content-Type': 'application/json',
	};

	if ( auth ) {
		headers.Authorization = auth;
	}

	if ( args ) {
		normalize_fetch_args( args ).forEach( ( [ name, value ] ) => {
			url.searchParams.append( name, value );
		} );
	}

	return fetch( url, { headers } );
}

/**
 * Fetch and parse response
 *
 * @since 0.1.0
 *
 * @template {import('zod').ZodTypeAny} T
 *
 * @param {T} schema Zod schema to parse the response with.
 * @param {() => ReturnType<typeof fetch>} fetcher Fetch function.
 *
 * @throws {Error|import('zod').ZodError}
 *
 * @return {ReturnType<import('$types').HandleResponse<import('zod').infer<T>>>} Parsed data.
 */
export async function fetch_and_parse( schema, fetcher ) {
	return make_response_handler( async data => schema.parse( data ) )( await fetcher() );
}
