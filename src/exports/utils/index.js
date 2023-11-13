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
