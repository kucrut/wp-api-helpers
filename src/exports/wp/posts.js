import { fetch_and_parse, fetch_data } from '../utils/index.js';
import { post_view } from './schema.js';

/**
 * Get single post
 *
 * @since 0.2.0
 *
 * @param {number} id Post ID (optional).
 * @param {string} url WordPress API root URL.
 * @param {string=} auth Authorization header.
 * @param {string=} type Post type, defaults to 'posts'.
 *
 * @todo Add args parameter.
 *
 * @throws {Error|import('zod').ZodError}
 *
 * @return {Promise<import('zod').infer<typeof post_view>>} Post data.
 */
export async function get_post( id, url, auth = '', type = 'posts' ) {
	return fetch_and_parse( post_view, () => fetch_data( `${ url }/wp/v2/${ type }/${ id }`, auth ) );
}

/**
 * Get posts
 *
 * @since 0.2.0
 *
 * @param {string} url WordPress API root URL.
 * @param {string=} auth Authorization header.
 * @param {string=} type Post type, defaults to 'posts'.
 *
 * @todo Add args parameter.
 *
 * @throws {Error|import('zod').ZodError}
 *
 * @return {Promise<import('zod').infer<typeof post_view>[]>} Post data.
 */
export async function get_posts( url, auth = '', type = 'posts' ) {
	return fetch_and_parse( post_view.array(), () => fetch_data( `${ url }/wp/v2/${ type }`, auth ) );
}
