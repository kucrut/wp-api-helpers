import { describe, test, expect, vi } from 'vitest';
import { jwt_login } from '../../src/exports/wp/index.js';

global.fetch = vi.fn();

describe( 'JWT Login', () => {
	const url = 'https://test.local/index.php?rest_route=';

	test( 'Make successful JWT login request', async () => {
		const password = 'password';
		const username = 'user';

		const data = {
			user_email: 'user@test.local',
			user_display_name: 'username',
			user_nicename: 'username',
			token: 'token',
		};

		/** @param {boolean} handle */
		const make_request = handle => jwt_login( { url, username, password, handle } );
		const fake_response = () => {
			fetch.mockReturnValueOnce(
				new Response( JSON.stringify( data ), {
					headers: { 'Content-Type': 'application/json' },
				} ),
			);
		};

		fake_response();
		const response_with_default_handle = await make_request( true );

		expect( fetch ).toHaveBeenCalledWith( `${ url }/jwt-auth/v1/token`, {
			method: 'POST',
			body: JSON.stringify( {
				username,
				password,
			} ),
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
			},
		} );

		expect( response_with_default_handle ).toStrictEqual( data );

		fake_response();
		const response_without_default_handle = await make_request( false );
		const result = await response_without_default_handle.json();
		expect( result ).toStrictEqual( data );
	} );

	test( 'Throw error when given invalid credentials', async () => {
		const error = {
			code: 'jwt_auth_error',
			message: 'Invalid credentials',
			data: { status: 403 },
		};

		const fake_response = data => {
			fetch.mockReturnValueOnce(
				new Response( JSON.stringify( data ), {
					headers: { 'Content-Type': 'application/json' },
					status: 403,
				} ),
			);
		};

		/** @type {boolean} handle */
		const make_request = handle => jwt_login( { username: 'user', password: 'pass', url, handle } );

		fake_response( error );
		await expect( make_request ).rejects.toThrowError( 'Invalid credentials' );

		fake_response( error );
		const response = await make_request( false );
		const json = await response.json();
		expect( json ).toStrictEqual( error );

		const unknown_error = { error: true };
		fake_response( unknown_error );
		await expect( make_request ).rejects.toThrowError( 'Unexpected response' );
	} );
} );
