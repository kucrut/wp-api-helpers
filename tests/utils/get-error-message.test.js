import { expect, describe, test, vi } from 'vitest';
import { get_error_message } from '../../src/exports/utils/index.js';

describe( 'Get error message', () => {
	test( 'Message from generic Error is returned.', () => {
		const message = 'Boo!';
		const result = get_error_message( new Error( message ), '' );

		expect( result ).toStrictEqual( message );
	} );

	test( 'Fallback message is returned when the error is not recognized, and error is dumped.', () => {
		const console_mock = vi.spyOn( console, 'error' ).mockImplementation( () => undefined );
		const fallback = 'Fallback message';
		const result = get_error_message( null, fallback );

		expect( result ).toStrictEqual( fallback );
		expect( console_mock ).toHaveBeenCalledOnce();
		expect( console_mock ).toHaveBeenCalledWith( null );
	} );

	test( 'Fallback message is returned when the error is not recognized, and error is not dumped.', () => {
		const console_mock = vi.spyOn( console, 'error' ).mockImplementation( () => undefined );
		const fallback = 'Fallback message';
		const result = get_error_message( null, fallback, false );

		expect( result ).toStrictEqual( fallback );
		expect( console_mock ).not.toHaveBeenCalled();
	} );
} );
