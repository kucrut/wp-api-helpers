import { describe, test, expect, vi } from 'vitest';
import { get_jwt_auth } from '../../src/exports/wp/index.js';

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

		const make_request = () => get_jwt_auth( url, username, password );
		const fake_response = () => {
			fetch.mockReturnValueOnce(
				new Response( JSON.stringify( data ), {
					headers: { 'Content-Type': 'application/json' },
				} ),
			);
		};

		fake_response();
		const response_with_default_handle = await make_request();

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
	} );

	test( 'Throw error when given invalid credentials', async () => {
		const console_mock = vi.spyOn( console, 'error' ).mockImplementation( () => undefined );

		const fake_response = data => {
			fetch.mockReturnValueOnce(
				new Response( JSON.stringify( data ), {
					headers: { 'Content-Type': 'application/json' },
					status: 403,
				} ),
			);
		};

		const make_request = () => get_jwt_auth( { username: 'user', password: 'pass', url } );

		fake_response( {
			code: 'jwt_auth_error',
			message: 'Invalid credentials',
			data: { status: 403 },
		} );
		await expect( make_request ).rejects.toThrowError( 'Invalid credentials' );

		fake_response( { error: true } );
		await expect( make_request ).rejects.toThrowError( 'Unexpected response' );
		expect( console_mock ).toHaveBeenCalledOnce();
	} );
} );
