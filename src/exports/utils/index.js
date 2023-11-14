import { rest_error_schema } from '../wp/schema.js';
import { ZodError } from 'zod';

/**
 * Get error message
 *
 * @since 0.1.0
 *
 * @param {unknown}  error    Error object, whatever.
 * @param {string}   fallback Fallback message if the error is unrecognized.
 * @param {boolean=} dump     Whether to dump error if the error is unrecognized. (Defaults to true).
 *
 * @return {string} Error message.
 */
export function get_error_message( error, fallback, dump = true ) {
	/** @type {string} */
	let message;

	if ( error instanceof Error || error instanceof ZodError ) {
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
 * @since 0.0.1
 *
 * @template T
 *
 * @param {Response} response Fetch response object.
 * @param {import('$types').HandleResponse<T>} callback Callback to run when json is valid.
 *
 * @throws {Error} JSON.parse error.
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

			throw new Error( `Unexpected response: ${ message }\n${ text }` );
		}

		return await callback( result );
	}

	const json = await response.json();
	const error = rest_error_schema.safeParse( json );
	/** @type {string} */
	let message;

	if ( error.success ) {
		message = error.data.message;
	} else {
		message = 'Unexpected response from server. Please consult the logs.';
		// eslint-disable-next-line no-console
		console.error( error );
	}

	throw new Error( message );
}

/**
 * Make response handler
 *
 * @template T
 *
 * @param {import('$types').HandleResponse<T>} handler Handler function.
 * @return {(resp: Response) => Promise<T>} Bleh
 */
export function make_response_handler( handler ) {
	/** @param {Response} response */
	return response => handle_response( response, handler );
}
