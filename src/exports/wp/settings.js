import { fetch_and_parse, fetch_data } from '../utils/index.js';
import { settings } from './schema.js';

/**
 * Get settings
 *
 * @since 0.2.0
 *
 * @param {string} url WordPress API root URL.
 * @param {string} auth Authorization header.
 *
 * @throws {Error|import('zod').ZodError}
 *
 * @return {Promise<import('zod').infer<typeof settings>>} Settings data.
 */
export async function get_settings( url, auth ) {
	return fetch_and_parse( settings, () => fetch_data( `${ url }/wp/v2/settings`, auth ) );
}
