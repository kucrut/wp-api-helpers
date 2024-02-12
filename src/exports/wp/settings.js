import { fetch_and_parse, fetch_data } from '../utils/index.js';
import { z } from 'zod';

export const settings = z.object( {
	date_format: z.string(),
	default_category: z.number(),
	default_comment_status: z.enum( [ 'open', 'closed' ] ),
	default_ping_status: z.enum( [ 'open', 'closed' ] ),
	default_post_format: z.string(),
	description: z.string(),
	email: z.string().email(),
	language: z.string(),
	page_for_posts: z.number(),
	page_on_front: z.number(),
	posts_per_page: z.number(),
	show_on_front: z.enum( [ 'page', 'posts' ] ),
	site_icon: z.number().nullable(),
	site_logo: z.number().nullable(),
	start_of_week: z.number(),
	time_format: z.string(),
	timezone: z.string(),
	title: z.string(),
	url: z.string(),
	use_smilies: z.boolean(),
} );

/** @typedef {z.infer<typeof settings>} WP_Settings */

/**
 * Get settings
 *
 * @since 0.2.0
 *
 * @param {string} url WordPress API root URL.
 * @param {string} auth Authorization header.
 *
 * @throws {Error|z.ZodError}
 *
 * @return {Promise<WP_Settings>} Settings data.
 */
export async function get_settings( url, auth ) {
	return fetch_and_parse( settings, () => fetch_data( `${ url }/wp/v2/settings`, auth ) );
}
