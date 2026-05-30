import * as v from 'valibot';
import { CommentStatusSchema, EmailSchema } from './schema.js';
import { fetch_and_parse, fetch_data } from '../utils/index.js';

/** @typedef {v.InferOutput<typeof SettingsSchema>} WP_Settings */
export const SettingsSchema = v.object( {
	date_format: v.string(),
	default_category: v.number(),
	default_comment_status: CommentStatusSchema,
	default_ping_status: CommentStatusSchema,
	default_post_format: v.string(),
	description: v.string(),
	email: EmailSchema,
	language: v.string(),
	page_for_posts: v.number(),
	page_on_front: v.number(),
	posts_per_page: v.number(),
	show_on_front: v.picklist( [ 'page', 'posts' ] ),
	site_icon: v.nullable( v.number() ),
	site_logo: v.nullable( v.number() ),
	start_of_week: v.number(),
	time_format: v.string(),
	timezone: v.string(),
	title: v.string(),
	url: v.string(),
	use_smilies: v.boolean(),
} );

/**
 * Get settings
 *
 * @since 0.2.0
 *
 * @param {string} url WordPress API root URL.
 * @param {string} auth Authorization header.
 *
 * @throws {Error|v.ValiError|import('../utils/index.js').WP_REST_Error} JSON.parse error, Valibot error or WP API error.
 *
 * @return {Promise<WP_Settings>} Settings data.
 */
export async function get_settings( url, auth ) {
	return fetch_and_parse( SettingsSchema, () => fetch_data( `${ url }/wp/v2/settings`, auth ) );
}
