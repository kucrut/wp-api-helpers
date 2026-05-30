import { defineConfig } from 'eslint/config';
import configs from '@kucrut/eslint-config';
import globals from 'globals';
import jsdoc from 'eslint-plugin-jsdoc';
import json from '@eslint/json';
import markdown from '@eslint/markdown';
import ts from 'typescript-eslint';

/** @type {import('eslint/config').Config} */
const base_js = {
	extends: [
		configs.js,
		ts.configs.recommended,
		jsdoc.configs[ 'flat/recommended-typescript-flavor-error' ],
		jsdoc.configs[ 'flat/contents-typescript-flavor-error' ],
		jsdoc.configs[ 'flat/logical-typescript-flavor-error' ],
		jsdoc.configs[ 'flat/stylistic-typescript-flavor-error' ],
	],
	files: [
		'**/*.cjs',
		'**/*.js',
		'**/*.mjs',
		'**/*.ts',
	],
	ignores: [
		'**/*.html',
		'**/*.json',
		'**/*.md',
	],
	languageOptions: {
		globals: {
			...globals.browser,
		},
	},
	rules: {
		'jsdoc/match-description': 'off',
		'jsdoc/no-types': 'off',
		'jsdoc/tag-lines': [ 'error', 'any', { startLines: 1 } ],
		'@stylistic/max-len': [ 'error', {
			code: 100,
			ignoreComments: true,
			ignoreRegExpLiterals: true,
			ignoreStrings: true,
			ignoreTemplateLiterals: true,
		} ],
	},
	settings: {
		jsdoc: {
			tagNamePreference: {
				returns: 'return',
			},
		},
	},
};

/** @type {import('eslint/config').Config} */
const base_json = {
	plugins: { json },
	extends: [ 'json/recommended' ],
};

export default defineConfig( [
	{
		ignores: [ 'types/**' ],
	},
	{
		...base_js,
		name: 'JS',
		languageOptions: {
			globals: {
				...globals.node,
			},
		},
	},
	{
		...base_json,
		name: 'JSON',
		files: [ '**/*.json' ],
		ignores: [ 'package-lock.json', 'pnpm-lock.json' ],
		language: 'json/json',
	},
	{
		...base_json,
		name: 'JSON5',
		files: [ '**/*.json5' ],
		language: 'json/json5',
	},
	{
		...base_json,
		name: 'JSONC',
		files: [ '**/*.jsonc', 'tsconfig.json', '.vscode/*.json', '.zed/*.json' ],
		language: 'json/jsonc',
		languageOptions: {
			allowTrailingCommas: true,
		},
	},
	{
		name: 'Markdown',
		extends: [ markdown.configs.processor ],
	},
] );
