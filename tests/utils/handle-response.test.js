import { expect, describe, test } from 'vitest';
import { handle_response } from '../../src/exports/utils/index.js';

describe( 'Handle response from WP API', () => {
	test( 'Data is properly returned.', async () => {
		const data = { hello: 'world' };
		const response = new Response( JSON.stringify( data ) );
		const result = await handle_response( response, r => r );

		expect( result ).toStrictEqual( data );
	} );

	test( 'Processed data is properly returned.', async () => {
		const processed_data = { hello: 'earth' };
		const response = new Response( JSON.stringify( { hello: 'world' } ) );
		const result = await handle_response( response, () => processed_data );

		expect( result ).toStrictEqual( processed_data );
	} );

	test( 'Successful request with bad JSON response returns proper error.', async () => {
		const bad_response = () => handle_response( new Response( null ), () => {} );

		await expect( bad_response ).rejects.toThrowError( /Unexpected.*JSON/ );
	} );

	test( 'Successful request with text response returns proper error.', async () => {
		const bad_response = () => handle_response( new Response( 'Bad response' ), () => {} );

		await expect( bad_response ).rejects.toThrowError( 'Bad response' );
	} );

	test( 'Failed request with bad response body returns proper error.', async () => {
		const bad_response = () => handle_response( new Response( null, { status: 500 } ), () => {} );

		await expect( bad_response ).rejects.toThrowError( /Unexpected.*JSON/ );
	} );

	test( 'Failed request with WP API Error response body returns proper error.', async () => {
		const bad_response = () =>
			handle_response(
				new Response(
					JSON.stringify( {
						code: 'rest_error',
						message: 'Error message from WP API',
						data: {
							status: 403,
						},
					} ),
					{ status: 500 },
				),
				() => {},
			);

		await expect( bad_response ).rejects.toThrowError( 'Error message from WP API' );
	} );

	test( 'Failed request with unknown JSON response body returns proper error.', async () => {
		const bad_response = () =>
			handle_response(
				new Response(
					JSON.stringify( {
						error: true,
						message: 'Error message',
					} ),
					{ status: 500 },
				),
				() => {},
			);

		await expect( bad_response ).rejects.toThrowError( 'invalid_type' );
	} );
} );
