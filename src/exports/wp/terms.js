import { fetch_and_parse, fetch_data } from '../utils/index.js';
import { term_view } from './schema.js';

/**
 * Get taxonomy terms
 *
 * @since 0.1.0
 *
 * @param {string} url WordPress API root URL.
 * @param {string} taxonomy Taxonomy's rest_base.
 * @param {string=} auth Authorization header.
 * @param {import("$types").Fetch_Terms_Args=} args Request arguments.
 *
 * @throws {Error|import('zod').ZodError}
 *
 * @return {Promise<import('zod').infer<typeof term_view>[]>} Terms (view) data.
 */
export async function get_terms( url, taxonomy, auth, args ) {
	return fetch_and_parse( term_view.array(), () => fetch_data( `${ url }/wp/v2/${ taxonomy }`, auth, args ) );
}
