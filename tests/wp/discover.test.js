import { describe, test, expect, vi } from 'vitest';
import { discover } from '../../src/exports/wp/index.js';

global.fetch = vi.fn();

/** @param {ResponseInit=} init */
const create_response = init => new Response( null, init );

/** @param {ResponseInit=} init */
const make_fail_test = async init => {
	fetch.mockReturnValueOnce( create_response( init ) );

	/** @type {boolean} */
	let has_error;

	try {
		await discover( 'boo' );
		has_error = false;
	} catch ( error ) {
		has_error = true;
	}

	return has_error;
};

describe( 'Discover WP API', () => {
	test( 'Return WP API root URL from proper response.', async () => {
		fetch.mockReturnValueOnce(
			create_response( {
				headers: {
					Link: '<https://test.local/index.php?rest_route=/>; rel="https://api.w.org/"',
				},
			} ),
		);

		const api_url = await discover( 'https://test.local' );

		expect( fetch ).toHaveBeenCalledWith( 'https://test.local', { method: 'HEAD' } );
		expect( api_url ).toStrictEqual( 'https://test.local/index.php?rest_route=' );
	} );

	test( 'Throw error when status is not 200', async () => {
		const result = await make_fail_test( { status: 404 } );

		expect( result ).toStrictEqual( true );
	} );

	test( 'Throw error when link header is not found.', async () => {
		const result = await make_fail_test( {
			headers: {
				'X-Powered-By': 'Coffee',
			},
		} );

		expect( result ).toStrictEqual( true );
	} );

	test( 'Throw error when WP API URL is not found in link header.', async () => {
		const result = await make_fail_test( {
			headers: {
				Link: '<https://random.local>;',
			},
		} );

		expect( result ).toStrictEqual( true );
	} );
} );
