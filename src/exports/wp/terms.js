import { make_response_handler, normalize_fetch_args } from '../utils/index.js';
import { term } from './schema.js';

/**
 * Fetch taxonomy terms
 *
 * @since 0.1.0
 *
 * @param {string} url WordPress API root URL.
 * @param {string} auth Autorization header.
 * @param {string=} taxonomy Taxonomy's rest_base.
 * @param {import("$types").FetchTermsArgs=} args Request arguments.
 *
 * @throws {Error}
 *
 * @return {Promise<Response>} Fetch response.
 */
export function fetch_terms( url, auth, taxonomy, args ) {
	const endpoint = new URL( `${ url }/wp/v2/${ taxonomy }` );

	if ( args ) {
		normalize_fetch_args( args ).forEach( ( [ name, value ] ) => {
			endpoint.searchParams.append( name, value );
		} );
	}

	return fetch( endpoint, {
		method: 'GET',
		headers: {
			'Accept': 'application/json',
			'Authorization': auth,
			'Content-Type': 'application/json',
		},
	} );
}

/**
 * Get taxonomy terms
 *
 * @since 0.1.0
 *
 * @type {import('$types').HandledFetch<fetch_terms, import('./schema').Term[]>}
 */
export async function get_terms( ...args ) {
	return make_response_handler( async data => term.array().parse( data ) )( await fetch_terms( ...args ) );
}
