/** @import {InferOutput, ValiError} from "valibot" */
/** @import {WP_REST_Error} from "../utils/index.js" */

import { boolean, nullable, number, object, picklist, string } from 'valibot';
import { CommentStatusSchema, EmailSchema } from './schema.js';
import { fetch_and_parse, fetch_data } from '../utils/index.js';

/** @typedef {InferOutput<typeof SettingsSchema>} WP_Settings */
export const SettingsSchema = object( {
	date_format: string(),
	default_category: number(),
	default_comment_status: CommentStatusSchema,
	default_ping_status: CommentStatusSchema,
	default_post_format: string(),
	description: string(),
	email: EmailSchema,
	language: string(),
	page_for_posts: number(),
	page_on_front: number(),
	posts_per_page: number(),
	show_on_front: picklist( [ 'page', 'posts' ] ),
	site_icon: nullable( number() ),
	site_logo: nullable( number() ),
	start_of_week: number(),
	time_format: string(),
	timezone: string(),
	title: string(),
	url: string(),
	use_smilies: boolean(),
} );

/**
 * Get settings
 *
 * @since 0.2.0
 *
 * @param {string} url WordPress API root URL.
 * @param {string} auth Authorization header.
 *
 * @throws {Error|ValiError|WP_REST_Error} JSON.parse error, Valibot error or WP API error.
 *
 * @return {Promise<WP_Settings>} Settings data.
 */
export async function get_settings( url, auth ) {
	return fetch_and_parse( SettingsSchema, () => fetch_data( `${ url }/wp/v2/settings`, auth ) );
}
