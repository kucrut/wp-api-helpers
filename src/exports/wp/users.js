import { fetch_and_parse, pick_schema } from '../utils/index.js';
import { user_edit, user_embed, user_view } from './schema.js';

/**
 * Get user data
 *
 * @since 0.1.0
 *
 * @template {import('../../types.ts').ContextArg} C
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
