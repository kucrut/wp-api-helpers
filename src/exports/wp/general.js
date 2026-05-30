import { fetch_and_parse, fetch_data, get_fetch } from '../utils/index.js';
import { LinkItemSchema, UrlSchema } from './schema.js';
import * as v from 'valibot';

/** @typedef {v.InferOutput<typeof InfoSchema>} WP_Info */
export const InfoSchema = v.object( {
	description: v.string(),
	// TODO
	gmt_offset: v.pipe( v.string(), v.toNumber() ),
	home: UrlSchema,
	name: v.string(),
	namespaces: v.array( v.string() ),
	site_icon_url: UrlSchema,
	site_icon: v.number(),
	site_logo: v.number(),
	timezone_string: v.string(),
	url: UrlSchema,
	authentication: v.record(
		v.string(),
		v.object( {
			endpoints: v.object( {
				authorization: UrlSchema,
			} ),
		} ),
	),
	_links: v.record( v.string(), LinkItemSchema ),
} );

/**
 * Discover WordPress API root URL
 *
 * @since 0.1.0
 *
 * @param {string} url WordPress URL.
 *
 * @throws {Error}
 *
 * @return {Promise<string>} WordPress API root URL.
 */
export async function discover( url ) {
	const response = await get_fetch()( url, {
		method: 'HEAD',
	} );

	if ( ! response.ok ) {
		throw new Error( `HEAD request failed: ${ response.statusText }` );
	}

	const link = response.headers.get( 'Link' );

	if ( ! link ) {
		throw new Error( 'Link header not found.' );
	}

	const match = link.match( /^<(.*)\/>; rel="https:\/\/api.w.org\/"/ );

	if ( ! match ) {
		throw new Error( `Could not find REST API URL from Link header. Are you sure it's a WordPress site?` );
	}

	return match[ 1 ];
}

/**
 * Get site info
 *
 * @since 0.2.0
 *
 * @param {string} url WordPress API root URL.
 * @param {string} auth Authorization header.
 *
 * @throws {Error|v.ValiError}
 *
 * @return {Promise<WP_Info>} Site info data.
 */
export async function get_info( url, auth = '' ) {
	return fetch_and_parse( InfoSchema, () => fetch_data( `${ url }/`, auth ) );
}
