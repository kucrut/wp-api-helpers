import { fetch_and_parse, fetch_data, pick_schema } from '../utils';
import { get_info } from './general';
import { application_password_embed, application_password_view } from './schema';

/**
 * Generate URL for application password requests
 *
 * @param {string} url WP API root URL.
 * @param {import('../../types.ts').User_ID_Arg} user_id User ID.
 * @param {import('../../types.ts').Context_Arg} context Request context.
 *
 * @return {URL} Endpoint URL.
 */
function generate_url( url, user_id, context = undefined ) {
	const endpoint = new URL( `${ url }/wp/v2/users/${ user_id }/application-passwords` );

	if ( context ) {
		endpoint.searchParams.append( 'context', context );
	}

	return endpoint;
}

/**
 * Get application password authorization endpoint
 *
 * @since 0.3.0
 *
 * @param {string} url WP API root URL.
 * @return {Promise<string>} Application password authorization route.
 *
 * @throws {Error|import('z').ZodError}
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
 * @template {import('../../types.ts').Context_Arg} C
 *
 * @param {string} url WordPress API root URL.
 * @param {string} auth Authorization header.
 * @param {import('../../types.ts').User_ID_Arg} user_id User ID or 'me'.
 * @param {C=} context Request context, defaults to 'view'.
 *
 * @throws {Error|import('zod').ZodError}
 *
 * @return {Promise<import('zod').infer<import('../../types.ts').Schema_By_Context<C, typeof application_password_view, typeof application_password_embed, typeof application_password_view>>[]>} Users data.
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
