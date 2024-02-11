import { expect, describe, test } from 'vitest';
import { create_basic_auth_string } from '../../src/exports/utils/index.js';

describe( 'Create basic auth string', () => {
	test( 'Proper string is returned.', () => {
		const actual = create_basic_auth_string( 'username', 'password' );
		const expected = `Basic ${ Buffer.from( 'username:password' ).toString( 'base64' ) }`;

		expect( actual ).toStrictEqual( expected );
	} );
} );
