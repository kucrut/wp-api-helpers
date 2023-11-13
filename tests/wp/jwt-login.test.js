import { describe, test, expect, vi } from 'vitest';
import { jwt_login } from '../../src/exports/wp/index.js';

global.fetch = vi.fn();

describe( 'JWT Login', () => {
	test( 'Make successful JWT login request', async () => {
		const email = 'user@test.local';
		const password = 'password';
		const url = 'https://test.local/index.php?rest_route=';
		const username = 'user';

		const data = {
			user_email: email,
			user_display_name: username,
			user_nicename: username,
			token: 'token',
		};

		fetch.mockReturnValueOnce(
			new Response( JSON.stringify( data ), {
				headers: { 'Content-Type': 'application/json' },
			} ),
		);

		const response = await jwt_login( { url, username, password } );

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

		const json = await response.json();
		expect( json ).toStrictEqual( data );
	} );
} );
