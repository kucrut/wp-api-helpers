/** @import {ArraySchema, InferOutput, ValiError} from "valibot" */
/** @import {WP_REST_Error} from "../utils/index.js" */

import { array, boolean, entriesFromObjects, minLength, object, pipe, record, string } from 'valibot';
import { fetch_and_parse, fetch_data, generate_endpoint_url } from '../utils/index.js';
import { EmailSchema, IdSchema, LinkItemSchema, MetaSchema, UrlSchema } from './schema.js';

const CapabilitiesSchema = record( string(), boolean() );

/** @typedef {InferOutput<typeof UserEmbedSchema>} WP_User_Embed */
export const UserEmbedSchema = object( {
	avatar_urls: record( string(), UrlSchema ),
	description: string(),
	id: IdSchema,
	name: pipe( string(), minLength( 1 ) ),
	url: UrlSchema,
	slug: string(),
	_links: object( {
		self: LinkItemSchema,
		collection: LinkItemSchema,
	} ),
} );

/** @typedef {InferOutput<typeof UserViewSchema>} WP_User */
export const UserViewSchema = object( entriesFromObjects( [
	UserEmbedSchema,
	object( { meta: MetaSchema } ),
] ) );

/** @typedef {InferOutput<typeof UserEditSchema>} WP_User_Edit */
export const UserEditSchema = object( entriesFromObjects( [
	UserViewSchema,
	object( {
		capabilities: record( string(), boolean() ),
		email: EmailSchema,
		extra_capabilities: CapabilitiesSchema,
		first_name: string(),
		last_name: string(),
		link: UrlSchema,
		locale: string(),
		nickname: string(),
		registered_date: CapabilitiesSchema,
		roles: array( string() ),
		username: string(),
	} ),
] ) );

const UserQuerySchemas = {
	edit: UserEditSchema,
	embed: UserEmbedSchema,
	view: UserViewSchema,
};

/**
 * Generate URL for user requests
 *
 * @param {string} url WP API root URL.
 * @param {import('$types').Context_Arg|undefined} context Request context.
 * @param {import('$types').User_ID_Arg|undefined} id User ID or 'me'.
 *
 * @return {URL} Endpoint URL.
 */
function generate_url( url, context = undefined, id = undefined ) {
	return generate_endpoint_url( `${ url }/wp/v2/users`, context, id );
}

/**
 * Get user data
 *
 * @since 0.1.0
 *
 * @template {keyof typeof UserQuerySchemas} C
 *
 * @param {import('$types').User_ID_Arg} id User ID or 'me'.
 * @param {string} url WordPress API root URL.
 * @param {C} context Request context, defaults to 'view'.
 * @param {string} auth Authorization header (required when `id` is `me`).
 *
 * @throws {Error|ValiError|WP_REST_Error} JSON.parse error, Valibot error or WP API error.
 *
 * @return {Promise<InferOutput<typeof UserQuerySchemas[C]>>} User data.
 */
export function get_single_user( id, url, context, auth = '' ) {
	if ( typeof id === 'number' && id < 1 ) {
		throw new Error( '[get_user] User ID must be greater than 0.' );
	}

	if ( id === 'me' && ! auth ) {
		throw new Error( '[get_user] auth is required to get self user data.' );
	}

	if ( context === 'edit' && ! auth ) {
		throw new Error( '[get_single_user] auth is required when context is set to `edit`.' );
	}

	return fetch_and_parse(
		UserQuerySchemas[ context ],
		() => fetch_data( generate_url( url, context, id ), auth ),
	);
}

/**
 * Get users
 *
 * @since 0.1.0
 *
 * @template {keyof typeof UserQuerySchemas} C
 *
 * @param {string} url WordPress API root URL.
 * @param {C} context Request context.
 * @param {string} auth Authorization header.
 * @param {import('$types').Fetch_Users_Args} args Request arguments.
 *
 * @throws {Error|ValiError|WP_REST_Error} JSON.parse error, Valibot error or WP API error.
 *
 * @return {Promise<InferOutput<ArraySchema<typeof UserQuerySchemas[C], undefined>>>} User collection.
 */
export function get_users( url, context, auth = '', args = {} ) {
	return fetch_and_parse(
		array( UserQuerySchemas[ context ] ),
		() => fetch_data( generate_url( url, context ), auth, args ),
	);
}
