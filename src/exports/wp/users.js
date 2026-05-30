import * as v from 'valibot';
import { fetch_and_parse, fetch_data, generate_endpoint_url } from '../utils/index.js';
import { EmailSchema, IdSchema, LinkItemSchema, MetaSchema, UrlSchema } from './schema.js';

const CapabilitiesSchema = v.record( v.string(), v.boolean() );

/** @typedef {v.InferOutput<typeof UserEmbedSchema>} WP_User_Embed */
export const UserEmbedSchema = v.object( {
	avatar_urls: v.record( v.string(), UrlSchema ),
	description: v.string(),
	id: IdSchema,
	name: v.pipe( v.string(), v.minLength( 1 ) ),
	url: UrlSchema,
	slug: v.string(),
	_links: v.object( {
		self: LinkItemSchema,
		collection: LinkItemSchema,
	} ),
} );

/** @typedef {v.InferOutput<typeof UserViewSchema>} WP_User */
export const UserViewSchema = v.object( v.entriesFromObjects( [
	UserEmbedSchema,
	v.object( { meta: MetaSchema } ),
] ) );

/** @typedef {v.InferOutput<typeof UserEditSchema>} WP_User_Edit */
export const UserEditSchema = v.object( v.entriesFromObjects( [
	UserViewSchema,
	v.object( {
		capabilities: v.record( v.string(), v.boolean() ),
		email: EmailSchema,
		extra_capabilities: CapabilitiesSchema,
		first_name: v.string(),
		last_name: v.string(),
		link: UrlSchema,
		locale: v.string(),
		nickname: v.string(),
		registered_date: CapabilitiesSchema,
		roles: v.array( v.string() ),
		username: v.string(),
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
 * @throws {Error|v.ValiError}
 *
 * @return {Promise<v.InferOutput<typeof UserQuerySchemas[C]>>} User data.
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
 * @throws {Error|v.ValiError}
 *
 * @return {Promise<v.InferOutput<v.ArraySchema<typeof UserQuerySchemas[C], undefined>>>} User collection.
 */
export function get_users( url, context, auth = '', args = {} ) {
	return fetch_and_parse(
		v.array( UserQuerySchemas[ context ] ),
		() => fetch_data( generate_url( url, context ), auth, args ),
	);
}
