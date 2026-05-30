import * as v from 'valibot';
import { fetch_and_parse, fetch_data, generate_endpoint_url } from '../utils/index.js';
import { IdSchema, LinkItemSchema, MetaSchema } from './schema.js';

/** @typedef {v.InferOutput<typeof TermEmbedSchema>} WP_Term_Embed */
export const TermEmbedSchema = v.object( {
	id: IdSchema,
	link: v.string(),
	name: v.string(),
	slug: v.string(),
	taxonomy: v.string(),
	_links: v.object( {
		'about': LinkItemSchema,
		'collection': LinkItemSchema,
		'self': LinkItemSchema,
		'wp:post_type': LinkItemSchema,
	} ),
} );

/** @typedef {v.InferOutput<typeof TermViewSchema>} WP_Term */
export const TermViewSchema = v.object( v.entriesFromObjects( [
	TermEmbedSchema,
	v.object( {
		meta: MetaSchema,
		count: v.number(),
		description: v.string(),
		parent: v.number(),
	} ),
] ) );

/** @typedef {v.InferOutput<TermViewSchema>} WP_Term_Edit */

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
 * @throws {Error|v.ValiError}
 *
 * @return {Promise<v.InferOutput<v.ArraySchema<typeof TermQuerySchemas[C], undefined>>>} Term collection.
 */
export async function get_terms( url, taxonomy, context, auth = '', args = undefined ) {
	return fetch_and_parse(
		v.array( TermQuerySchemas[ context ] ),
		// @ts-expect-error TODO
		() => fetch_data( generate_url( url, taxonomy, context ), auth, args ),
	);
}
