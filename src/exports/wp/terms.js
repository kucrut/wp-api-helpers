/** @import {ArraySchema, InferOutput} from "valibot" */

import { array, entriesFromObjects, number, object, string } from 'valibot';
import { fetch_and_parse, fetch_data, generate_endpoint_url } from '../utils/index.js';
import { IdSchema, LinkItemSchema, MetaSchema } from './schema.js';

/** @typedef {InferOutput<typeof TermEmbedSchema>} WP_Term_Embed */
export const TermEmbedSchema = object( {
	id: IdSchema,
	link: string(),
	name: string(),
	slug: string(),
	taxonomy: string(),
	_links: object( {
		'about': LinkItemSchema,
		'collection': LinkItemSchema,
		'self': LinkItemSchema,
		'wp:post_type': LinkItemSchema,
	} ),
} );

/** @typedef {InferOutput<typeof TermViewSchema>} WP_Term */
export const TermViewSchema = object( entriesFromObjects( [
	TermEmbedSchema,
	object( {
		meta: MetaSchema,
		count: number(),
		description: string(),
		parent: number(),
	} ),
] ) );

/** @typedef {InferOutput<TermViewSchema>} WP_Term_Edit */

const TermQuerySchemas = {
	edit: TermViewSchema,
	embed: TermEmbedSchema,
	view: TermViewSchema,
};

/**
 * Generate URL for user requests
 *
 * @param {string} url WP API root URL.
 * @param {string} taxonomy Taxonomy's rest_base.
 * @param {import('$types').Context_Arg|undefined} context Request context.
 * @param {number|undefined} id Term ID.
 *
 * @return {URL} Endpoint URL.
 */
function generate_url( url, taxonomy, context = undefined, id = undefined ) {
	return generate_endpoint_url( `${ url }/wp/v2/${ taxonomy }`, context, id );
}

/**
 * Get taxonomy terms
 *
 * @since 0.1.0
 *
 * @template {keyof typeof TermQuerySchemas} C
 *
 * @param {string} url WordPress API root URL.
 * @param {string} taxonomy Taxonomy's rest_base.
 * @param {C} context Request context, defaults to 'view'.
 * @param {string|undefined} auth Authorization header.
 * @param {import("$types").Fetch_Terms_Args|undefined} args Request arguments.
 *
 * @return {Promise<InferOutput<ArraySchema<typeof TermQuerySchemas[C], undefined>>>} Term collection.
 */
export async function get_terms( url, taxonomy, context, auth = '', args = undefined ) {
	return fetch_and_parse(
		array( TermQuerySchemas[ context ] ),
		() => fetch_data( generate_url( url, taxonomy, context ), auth, args ),
	);
}
