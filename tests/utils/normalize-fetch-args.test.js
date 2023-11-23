import { expect, describe, test } from 'vitest';
import { normalize_fetch_args } from '../../src/exports/utils/index.js';

describe( 'Normalize fetch args', () => {
	test( 'Values are normalized to strings', () => {
		const args = {
			one: 'string',
			two: [ 2, 'two', 'twooo ' ],
			three: ' three ',
			false: false,
			true: true,
			nill: null,
			notdefined: undefined,
		};

		const params = normalize_fetch_args( args );

		expect( params ).toStrictEqual( [
			[ 'one', 'string' ],
			[ 'two', '2,two,twooo' ],
			[ 'three', 'three' ],
			[ 'false', '0' ],
			[ 'true', '1' ],
			[ 'nill', '0' ],
			[ 'notdefined', '0' ],
		] );
	} );
} );
