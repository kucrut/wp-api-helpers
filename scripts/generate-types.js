import { createBundle } from 'dts-buddy';

await createBundle( {
	include: [ 'src' ],
	output: 'types/index.d.ts',
	modules: {
		'@kucrut/wp-api-helpers': 'src/exports/wp/index.js',
	},
} );
