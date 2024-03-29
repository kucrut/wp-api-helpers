import { date_item } from './schema.js';
import { fetch_and_parse, fetch_data, generate_endpoint_url, get_fetch, pick_schema } from '../utils/index.js';
import { get_info } from './general.js';
import { z } from 'zod';

export const application_password_embed = z.object( {
	app_id: z.string(),
	name: z.string(),
	uuid: z.string(),
} );

export const application_password_view = application_password_embed.extend( {
	created: date_item,
	last_ip: z.string().ip(),
	last_used: date_item,
} );

export const application_password_deleted = z.object( {
	deleted: z.boolean(),
	previous: application_password_view,
} );

/** @typedef {z.infer<typeof application_password_view>} WP_Application_Password */
/** @typedef {z.infer<typeof application_password_deleted>} WP_Application_Password_Deleted */
/** @typedef {z.infer<typeof application_password_view>} WP_Application_Password_Edit */
/** @typedef {z.infer<typeof application_password_embed>} WP_Application_Password_Embed */

/**
 * Generate URL for application password requests
 *
 * @param {string} url WP API root URL.
 * @param {import('$types').User_ID_Arg} user_id User ID.
 * @param {import('$types').Context_Arg=} context Request context, defaults to 'view'
 * @param {string=} uuid Application password UUID.
 *
 * @return {URL} Endpoint URL.
 */
function generate_url( url, user_id, context = undefined, uuid = '' ) {
	return generate_endpoint_url( `${ url }/wp/v2/users/${ user_id }/application-passwords`, context, uuid );
}

/**
 * Get application password authorization endpoint
 *
 * @since 0.3.0
 *
 * @param {string} url WP API root URL.
 * @return {Promise<string>} Application password authorization route.
 *
 * @throws {Error|z.ZodError}
 */
export async function get_app_password_auth_endpoint( url ) {
	const info = await get_info( url );

	if ( info.authentication[ 'application-passwords' ]?.endpoints.authorization ) {
		return info.authentication[ 'application-passwords' ]?.endpoints.authorization;
	}

	throw new Error( 'Application Password authorization endpoint not found.' );
}

/**
 * Get application passwords
 *
 * @since 0.1.0
 *
 * @template {import('$types').Context_Arg} C
 *
 * @param {string} url WordPress API root URL.
 * @param {string} auth Authorization header.
 * @param {import('$types').User_ID_Arg} user_id User ID or 'me'.
 * @param {C=} context Request context, defaults to 'view'.
 *
 * @throws {Error|z.ZodError}
 *
 * @return {Promise<z.infer<import('$types').Schema_By_Context<C, typeof application_password_view, typeof application_password_embed, typeof application_password_view>>[]>} Application password collection.
 */
export function get_app_passwords( url, auth, user_id, context = undefined ) {
	const schema = pick_schema(
		application_password_view,
		application_password_embed,
		application_password_view,
		context,
	).array();

	return fetch_and_parse( schema, () => fetch_data( generate_url( url, user_id, context ), auth ) );
}

/**
 * Get current application password data
 *
 * @since 0.1.0
 *
 * @param {string} url WordPress API root URL.
 * @param {string} auth Authorization header.
 *
 * @throws {Error|import('zod').ZodError}
 *
 * @return {Promise<WP_Application_Password>} Response data.
 */
export function get_current_app_password( url, auth ) {
	return fetch_and_parse( application_password_view, () => {
		return get_fetch()( generate_url( url, 'me' ) + '/introspect', {
			headers: {
				Authorization: auth,
				Accept: 'application/json',
			},
		} );
	} );
}

/**
 * Delete application password
 *
 * @since 0.1.0
 *
 * @param {string} url WordPress API root URL.
 * @param {string} auth Authorization header.
 * @param {import('$types').User_ID_Arg} user_id User ID or 'me'.
 * @param {string} uuid Application password UUID.
 *
 * @throws {Error|import('zod').ZodError}
 *
 * @return {Promise<WP_Application_Password_Deleted>} Response data.
 */
export function delete_app_password( url, auth, user_id, uuid ) {
	return fetch_and_parse( application_password_deleted, () => {
		return get_fetch()( generate_url( url, user_id, undefined, uuid ), {
			method: 'DELETE',
			headers: {
				Authorization: auth,
				Accept: 'application/json',
			},
		} );
	} );
}
