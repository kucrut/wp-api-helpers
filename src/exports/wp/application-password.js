import * as v from 'valibot';
import { DateItemSchema } from './schema.js';
import { fetch_and_parse, fetch_data, generate_endpoint_url, get_fetch } from '../utils/index.js';
import { get_info } from './general.js';

/** @typedef {v.InferOutput<typeof ApplicationPasswordEmbedSchema>} WP_Application_Password_Embed */
export const ApplicationPasswordEmbedSchema = v.object( {
	app_id: v.string(),
	name: v.string(),
	uuid: v.pipe( v.string(), v.uuid() ),
} );

/** @typedef {v.InferOutput<typeof ApplicationPasswordViewSchema>} WP_Application_Password */
export const ApplicationPasswordViewSchema = v.object( v.entriesFromObjects( [
	ApplicationPasswordEmbedSchema,
	v.object( {
		created: DateItemSchema,
		last_ip: v.pipe( v.string(), v.ip() ),
		last_used: DateItemSchema,
	} ),
] ) );

/** @typedef {v.InferOutput<typeof ApplicationPasswordDeletedSchema>} WP_Application_Password_Deleted */
export const ApplicationPasswordDeletedSchema = v.object( {
	deleted: v.boolean(),
	previous: ApplicationPasswordViewSchema,
} );

const AppPassQuerySchemas = {
	edit: ApplicationPasswordViewSchema,
	embed: ApplicationPasswordEmbedSchema,
	view: ApplicationPasswordViewSchema,
};

/**
 * Generate URL for application password requests
 *
 * @param {string} url WP API root URL.
 * @param {import('$types').User_ID_Arg} user_id User ID.
 * @param {import('$types').Context_Arg|undefined} context Request context, defaults to 'view'
 * @param {string|undefined} uuid Application password UUID.
 *
 * @return {URL} Endpoint URL.
 */
function generate_url( url, user_id, context = undefined, uuid = '' ) {
	return generate_endpoint_url(
		`${ url }/wp/v2/users/${ user_id }/application-passwords`,
		context,
		uuid,
	);
}

/**
 * Get application password authorization endpoint
 *
 * @since 0.3.0
 *
 * @param {string} url WP API root URL.
 * @return {Promise<string>} Application password authorization route.
 *
 * @throws {Error|v.ValiError}
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
 * @template {keyof typeof AppPassQuerySchemas} C
 *
 * @param {string} url WordPress API root URL.
 * @param {string} auth Authorization header.
 * @param {import('$types').User_ID_Arg} user_id User ID or 'me'.
 * @param {C} context Request context, defaults to 'view'.
 *
 * @throws {Error|v.ValiError}
 *
 * @return {Promise<v.InferOutput<v.ArraySchema<typeof AppPassQuerySchemas[C], undefined>>>} Application password collection.
 */
export function get_app_passwords( url, auth, user_id, context ) {
	return fetch_and_parse(
		v.array( AppPassQuerySchemas[ context ] ),
		() => fetch_data( generate_url( url, user_id, context ), auth ),
	);
}

/**
 * Get current application password data
 *
 * @since 0.1.0
 *
 * @param {string} url WordPress API root URL.
 * @param {string} auth Authorization header.
 *
 * @throws {Error|v.ValiError}
 *
 * @return {Promise<WP_Application_Password>} Response data.
 */
export function get_current_app_password( url, auth ) {
	return fetch_and_parse( ApplicationPasswordViewSchema, () => {
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
 * @throws {Error|v.ValiError}
 *
 * @return {Promise<WP_Application_Password_Deleted>} Response data.
 */
export function delete_app_password( url, auth, user_id, uuid ) {
	return fetch_and_parse( ApplicationPasswordDeletedSchema, () => {
		return get_fetch()( generate_url( url, user_id, undefined, uuid ), {
			method: 'DELETE',
			headers: {
				Authorization: auth,
				Accept: 'application/json',
			},
		} );
	} );
}
