import { fetch_and_parse, fetch_data } from '../utils/index.js';
import { taxonomies_view } from './schema.js';

/**
 * Get taxonomies
 *
 * @since 0.1.0
 *
 * @param {string} url WordPress API root URL.
 * @param {string=} auth Authorization header.
 * @param {import("$types").Fetch_Taxonomies_Args=} args Request arguments.
 *
 * @throws {Error|import('zod').ZodError}
 *
 * @return {Promise<import('zod').infer<typeof taxonomies_view>>} Taxonomies (view) data.
 */
export async function get_taxonomies( url, auth, args ) {
	return fetch_and_parse( taxonomies_view, () => fetch_data( `${ url }/wp/v2/taxonomies`, auth, args ) );
}
