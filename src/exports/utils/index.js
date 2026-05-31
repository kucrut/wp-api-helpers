/** @import {GenericSchema, InferOutput} from "valibot" */

import { get_fetch } from './fetch.js';
import { parse, safeParse, ValiError } from 'valibot';
import { RestErrorSchema } from '../wp/schema.js';

export * from './fetch.js';

/**
 * Create basic auth string
 *
 * @since 0.3.0
 *
 * @param {string} username User name.
 * @param {string} password User password.
 * @return {string} Base64-encoded basic auth;
 */
export function create_basic_auth_string( username, password ) {
	return `Basic ${ Buffer.from( `${ username }:${ password.replaceAll( ' ', '' ) }` ).toString( 'base64' ) }`;
}

/**
 * Fetch and parse response
 *
 * @since 0.1.0
 *
 * @template {GenericSchema} T
 *
 * @param {T} schema Valibot schema to parse the response with.
 * @param {() => ReturnType<typeof fetch>} fetcher Fetch function.
 *
 * @throws {Error|ValiError}
 *
 * @return {ReturnType<import('$types').Handle_Response<InferOutput<T>>>} Parsed data.
 */
export async function fetch_and_parse( schema, fetcher ) {
	const handler = make_response_handler( async data => parse( schema, data ) );
	const response = await fetcher();

	return handler( response );
}

/**
 * Fetch data
 *
 * @since 0.1.0
 *
 * @param {string|URL} endpoint Data endpoint.
 * @param {string|undefined} auth Authentication header.
 * @param {object|undefined} args Arguments.
 *
 * @return {ReturnType<typeof fetch>} Response.
 */
export function fetch_data( endpoint, auth = '', args = undefined ) {
	const url = new URL( endpoint );

	const headers = new Headers( { Accept: 'application/json' } );

	if ( auth ) {
		headers.append( 'Authorization', auth );
	}

	if ( args ) {
		normalize_fetch_args( args ).forEach( ( [ name, value ] ) => {
			url.searchParams.append( name, value );
		} );
	}

	return get_fetch()( url, { headers } );
}

/**
 * Generate endpoint URL
 *
 * @since 0.3.0
 *
 * @param {string} base Base endpoint URL.
 * @param {import('$types').Context_Arg|undefined} context Request context, defaults to 'view'.
 * @param {string|number|undefined} suffix Endpoint suffix.
 *
 * @return {URL} URL object
 */
export function generate_endpoint_url( base, context = undefined, suffix = undefined ) {
	let endpoint = base;

	if ( suffix ) {
		endpoint = `${ endpoint }/${ suffix }`;
	}

	const endpoint_url = new URL( endpoint );

	if ( context ) {
		endpoint_url.searchParams.append( 'context', context );
	}

	return endpoint_url;
}

/**
 * Get error message
 *
 * @since 0.1.0
 *
 * @param {unknown} error Error object, whatever.
 * @param {string} fallback Fallback message if the error is unrecognized.
 * @param {boolean|undefined} dump Whether to dump error if the error is unrecognized. (Defaults to true).
 *
 * @return {string} Error message.
 */
export function get_error_message( error, fallback, dump = true ) {
	/** @type {string} */
	let message;

	if ( typeof error === 'string' ) {
		message = error;
	} else if ( error instanceof Error || error instanceof ValiError ) {
		message = error.message;
	} else {
		message = fallback;

		if ( dump ) {
			// eslint-disable-next-line no-console
			console.error( error );
		}
	}

	return message;
}

/**
 * Handle WP REST API response
 *
 * This helps catch syntax errors in json because of PHP notices, etc.
 *
 * @since 0.1.0
 *
 * @template T
 *
 * @param {Response} response Fetch response object.
 * @param {import('$types').Handle_Response<T>} callback Callback to run when json is valid.
 *
 * @throws {Error|ValiError|WP_REST_Error} JSON.parse error, Valibot error or WP API error.
 *
 * @return {Promise<T>} Whatever the callback returns.
 */
export async function handle_response( response, callback ) {
	const clone = response.clone();
	let result;

	if ( response.ok ) {
		try {
			result = await response.json();
		} catch ( error ) {
			const text = await clone.text();
			const message = get_error_message( error, 'Please consult the logs.' ).replace( '<', '&lt;' );

			throw new Error( `Unexpected response: ${ message }\n${ text }`, { cause: error } );
		}

		return await callback( result );
	}

	const data = await response.json();
	const wp_error_check = safeParse( RestErrorSchema, data );

	if ( wp_error_check.success ) {
		throw new WP_REST_Error(
			wp_error_check.output.message,
			wp_error_check.output.code,
			wp_error_check.output.data,
		);
	}

	throw new Error( 'Invalid data.', { cause: wp_error_check.issues } );
}

/**
 * Make response handler
 *
 * @since 0.1.0
 *
 * @template T
 *
 * @param {import('$types').Handle_Response<T>} handler Handler function.
 * @return {(resp: Response) => Promise<T>} Response handler function.
 */
export function make_response_handler( handler ) {
	return response => handle_response( response, handler );
}

/**
 * Normalize fetch arguments
 *
 * @since 0.1.0
 *
 * @param {object} args Fetch arguments.
 * @return {[string, string][]} Pairs of key and value strings.
 */
export function normalize_fetch_args( args ) {
	/**
	 * @param {unknown} input Raw input.
	 * @return {string} Normalised input.
	 */
	const to_string = input => {
		if ( input === true ) {
			return '1';
		}

		if ( input === false || input === null || input === undefined ) {
			return '0';
		}

		return input.toString();
	};

	return Object.entries( args ).map( ( [ name, value ] ) => {
		if ( typeof value === 'string' ) {
			return [ name, value.trim() ];
		}

		if ( Array.isArray( value ) ) {
			// TODO: Maybe reduce.
			return [ name, value.map( val => to_string( val ).trim() ).join( ',' ) ];
		}

		return [ name, to_string( value ).trim() ];
	} );
}

export class WP_REST_Error extends Error {
	/**
	 * @param {string} message Error message.
	 * @param {string} code REST error code.
	 * @param {{status: number}} data Misc. data.
	 */
	constructor( message, code, data ) {
		super( message );

		this.code = code;
		this.data = data;
		this.name = 'WP_REST_Error';
	}
}
