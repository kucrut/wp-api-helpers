import { fetch_and_parse, fetch_data } from '../utils/index.js';
import { post_view } from './schema.js';

/**
 * Get posts
 *
 * @since 0.1.0
 *
 * @param {string} url WordPress API root URL.
 * @param {string=} auth Authorization header.
 * @param {string=} type Post type, defaults to 'posts'.
 * @param {number=} id Post ID (optional).
 *
 * @todo Add args parameter.
 *
 * @throws {Error|import('zod').ZodError}
 *
 * @return {Promise<import('zod').infer<typeof post_view>>} Post data.
 */
export async function get_posts( url, auth = '', type = 'posts', id = undefined ) {
	let endpoint = `${ url }/wp/v2/${ type }`;

	if ( typeof id === 'number' && id > 0 ) {
		endpoint = `${ endpoint }/${ id }`;
	}

	return fetch_and_parse( post_view, () => fetch_data( endpoint, auth ) );
}
