/** @import {ArraySchema, InferOutput} from "valibot" */

import { array, boolean, entriesFromObjects, object, ip, pipe, string, uuid } from 'valibot';
import { DateItemSchema } from './schema.js';
import { fetch_and_parse, fetch_data, generate_endpoint_url, get_fetch } from '../utils/index.js';
import { get_info } from './general.js';

/** @typedef {InferOutput<typeof ApplicationPasswordEmbedSchema>} WP_Application_Password_Embed */
export const ApplicationPasswordEmbedSchema = object( {
	app_id: string(),
	name: string(),
	uuid: pipe( string(), uuid() ),
} );

/** @typedef {InferOutput<typeof ApplicationPasswordViewSchema>} WP_Application_Password */
export const ApplicationPasswordViewSchema = object( entriesFromObjects( [
	ApplicationPasswordEmbedSchema,
	object( {
		created: DateItemSchema,
		last_ip: pipe( string(), ip() ),
		last_used: DateItemSchema,
	} ),
] ) );

/** @typedef {InferOutput<typeof ApplicationPasswordDeletedSchema>} WP_Application_Password_Deleted */
export const ApplicationPasswordDeletedSchema = object( {
	deleted: boolean(),
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
 * @param {string|undefined} p_uuid Application password UUID.
 *
 * @return {URL} Endpoint URL.
 */
function generate_url( url, user_id, context = undefined, p_uuid = '' ) {
	return generate_endpoint_url(
		`${ url }/wp/v2/users/${ user_id }/application-passwords`,
		context,
		p_uuid,
	);
}

/**
 * Get application password authorization endpoint
 *
 * @since 0.3.0
 *
 * @param {string} url WP API root URL.
 *
 * @return {Promise<string>} Application password authorization route.
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
 * @return {Promise<InferOutput<ArraySchema<typeof AppPassQuerySchemas[C], undefined>>>} Application password collection.
 */
export function get_app_passwords( url, auth, user_id, context ) {
	return fetch_and_parse(
		array( AppPassQuerySchemas[ context ] ),
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
 * @param {string} puuid Application password UUID.
 *
 * @return {Promise<WP_Application_Password_Deleted>} Response data.
 */
export function delete_app_password( url, auth, user_id, puuid ) {
	return fetch_and_parse( ApplicationPasswordDeletedSchema, () => {
		return get_fetch()( generate_url( url, user_id, undefined, puuid ), {
			method: 'DELETE',
			headers: {
				Authorization: auth,
				Accept: 'application/json',
			},
		} );
	} );
}
