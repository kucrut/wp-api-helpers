import { fetch_and_parse, fetch_data, normalize_fetch_args } from '../utils/index.js';
import { taxonomies_view } from './schema.js';

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
 * @param {string} url WordPress API root URL.
 * @param {string=} auth Authorization header.
 * @param {import("$types").FetchTaxonomiesArgs=} args Request arguments.
 *
 * @throws {Error|import('zod').ZodError}
 *
 * @return {Promise<import('zod').infer<typeof taxonomies_view>>} Taxonomies (view) data.
 */
export async function get_taxonomies( url, auth, args ) {
	return fetch_and_parse( taxonomies_view, () => fetch_data( `${ url }/wp/v2/taxonomies`, auth, args ) );
}
