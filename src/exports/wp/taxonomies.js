import { make_response_handler, normalize_fetch_args } from '../utils/index.js';
import { taxonomy } from './schema.js';
import { z } from 'zod';

const PATH = '/wp/v2/taxonomies';

/**
 * Fetch taxonomies
 *
 * @since 0.1.0
 *
 * @param {string} url WordPress API root URL.
 * @param {string} auth Autorization header.
 * @param {import("$types").FetchTaxonomiesArgs=} args Request arguments.
 *
 * @throws {Error}
 *
 * @return {Promise<Response>} Fetch response.
 */
export function fetch_taxonomies( url, auth, args ) {
	const endpoint = new URL( url + PATH );

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
 * Get taxonomies
 *
 * @since 0.1.0
 *
 * @type {import('$types').HandledFetch<fetch_taxonomies, import('./schema').Taxonomy[]>}
 */
export async function get_taxonomies( ...args ) {
	return make_response_handler( async data => Object.values( z.record( taxonomy ).parse( data ) ) )(
		await fetch_taxonomies( ...args ),
	);
}
