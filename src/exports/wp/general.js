import { fetch_and_parse, fetch_data } from '../utils/index.js';
import { link_item } from './schema.js';
import { z } from 'zod';

export const info = z.object( {
	description: z.string(),
	gmt_offset: z.coerce.number(), // TODO.
	home: z.string().url(),
	name: z.string(),
	namespaces: z.string().array(),
	site_icon_url: z.string(),
	site_icon: z.number(),
	site_logo: z.number(),
	timezone_string: z.string(),
	url: z.string().url(),
	authentication: z.record(
		z.object( {
			endpoints: z.object( {
				authorization: z.string().url(),
			} ),
		} ),
	),
	_links: z.record( link_item ),
} );

/** @typedef {z.infer<typeof info>} WP_Info */

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
	const response = await fetch( url, {
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
 * @param {string=} auth Authorization header.
 *
 * @throws {Error|import('zod').ZodError}
 *
 * @return {Promise<WP_Info>} Site info data.
 */
export async function get_info( url, auth = '' ) {
	return fetch_and_parse( info, () => fetch_data( `${ url }/`, auth ) );
}
