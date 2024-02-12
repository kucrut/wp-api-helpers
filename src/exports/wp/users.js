import { fetch_and_parse, fetch_data, pick_schema } from '../utils/index.js';
import { link_item, meta } from './schema.js';
import { z } from 'zod';

export const user_embed = z.object( {
	avatar_urls: z.record( z.string().url() ),
	description: z.string(),
	id: z.number().min( 1 ),
	name: z.string().min( 1 ),
	url: z.string().url(),
	slug: z.string(),
	_links: z.object( {
		self: link_item,
		collection: link_item,
	} ),
} );

export const user_view = user_embed.extend( { meta } );

export const user_edit = user_view.extend( {
	capabilities: z.record( z.boolean() ),
	email: z.string().email(),
	extra_capabilities: z.record( z.boolean() ),
	first_name: z.string(),
	last_name: z.string(),
	link: z.string().url(),
	locale: z.string(),
	nickname: z.string(),
	registered_date: z.string().datetime( { offset: true } ),
	roles: z.string().array(),
	username: z.string(),
} );

/** @typedef {z.infer<typeof user_view>} WP_User */
/** @typedef {z.infer<typeof user_edit>} WP_User_Edit */
/** @typedef {z.infer<typeof user_embed>} WP_User_Embed */

/**
 * Get user data
 *
 * @since 0.1.0
 *
 * @template {import('../../types.ts').Context_Arg} C
 *
 * @param {string} url WordPress API root URL.
 * @param {number|'me'} id User ID or 'me'.
 * @param {string=} auth Authorization header (required when `id` is `me`).
 * @param {C=} context Request context, defaults to 'view'.
 *
 * @throws {Error|import('zod').ZodError}
 *
 * @return {Promise<import('zod').infer<import('../../types.ts').Schema_By_Context<C, typeof user_view, typeof user_embed, typeof user_edit>>>} User data.
 */
export function get_user( url, id, auth = undefined, context = undefined ) {
	if ( typeof id === 'number' && id < 1 ) {
		throw new Error( '[get_user] User ID must be greater than 0.' );
	}

	if ( id === 'me' && ! auth ) {
		throw new Error( '[get_user] auth is required to get self user data.' );
	}

	if ( context === 'edit' && ! auth ) {
		throw new Error( '[get_user] auth is required when context is set to `edit`.' );
	}

	/** @type {HeadersInit} */
	const headers = { Accept: 'application/json' };

	if ( auth ) {
		headers.Authorization = auth;
	}

	const endpoint = new URL( `${ url }/wp/v2/users/${ id }` );
	const schema = pick_schema( user_view, user_embed, user_edit, context );

	if ( context && context !== 'view' ) {
		endpoint.searchParams.append( 'context', context );
	}

	return fetch_and_parse( schema, () => fetch( endpoint, { headers } ) );
}

/**
 * Get users
 *
 * @since 0.1.0
 *
 * @template {import('../../types.ts').Context_Arg} C
 *
 * @param {string} url WordPress API root URL.
 * @param {string=} auth Authorization header (required when `id` is `me`).
 * @param {C=} context Request context, defaults to 'view'.
 * @param {import('../../types.ts').Fetch_Users_Args} args Request arguments.
 *
 * @throws {Error|import('zod').ZodError}
 *
 * @return {Promise<import('zod').infer<import('../../types.ts').Schema_By_Context<C, typeof user_view, typeof user_embed, typeof user_edit>>[]>} Users data.
 */
export function get_users( url, auth = '', context = undefined, args = {} ) {
	const fetch_args = args || {};
	const schema = pick_schema( user_view, user_embed, user_edit, context ).array();

	if ( context && context !== 'view' ) {
		fetch_args.context = context;
	}

	return fetch_and_parse( schema, () => fetch_data( `${ url }/wp/v2/users`, auth, fetch_args ) );
}
