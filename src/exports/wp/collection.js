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
export function fetch_collection( endpoint, auth = '', args = undefined ) {
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
 * Get collection
 *
 * @since 0.1.0
 *
 * @template T
 * @template {( ...args: any ) => ReturnType<typeof fetch>} F
 *
 * @param {import('zod').ZodTypeAny} schema Zod schema to parse the response with.
 * @param {F} fetcher Fetch function.
 * @param {...Parameters<F>} args fetch_collection arguments.
 *
 * @return {ReturnType<import('$types').HandleResponse<T>>} Parsed data.
 */

export async function get_collection( fetcher, schema, ...args ) {
	return make_response_handler( async data => schema.parse( data ) )( await fetcher( ...args ) );
}

// * @type {import('$types').HandledFetch<fetch_collection, import('./schema').User>}
