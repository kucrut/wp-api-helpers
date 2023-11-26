import { fetch_and_parse, fetch_data, normalize_fetch_args } from '../utils/index.js';
import { term_view } from './schema.js';

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
 * @param {string} url WordPress API root URL.
 * @param {string} taxonomy Taxonomy's rest_base.
 * @param {string=} auth Authorization header.
 * @param {import("$types").FetchTermsArgs=} args Request arguments.
 *
 * @throws {Error|import('zod').ZodError}
 *
 * @return {Promise<import('zod').infer<typeof term_view>[]>} Terms (view) data.
 */
export async function get_terms( url, taxonomy, auth, args ) {
	return fetch_and_parse( term_view.array(), () => fetch_data( `${ url }/wp/v2/${ taxonomy }`, auth, args ) );
}
