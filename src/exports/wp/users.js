import { user_view } from './schema.js';
import { fetch_and_parse, fetch_data } from '../utils/index.js';

/**
 * Get self user data
 *
 * @since 0.1.0
 *
 * @param {string} url WordPress API root URL.
 * @param {string} auth Authorization header.
 *
 * @throws {Error|import('zod').ZodError}
 *
 * @return {Promise<import('zod').infer<typeof user_view>>} User (view) data.
 */
export function get_me( url, auth ) {
	return fetch_and_parse( user_view, () => fetch_data( `${ url }/wp/v2/users/me`, auth ) );
}
