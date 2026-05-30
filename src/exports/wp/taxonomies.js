import * as v from 'valibot';
import { fetch_and_parse, fetch_data, generate_endpoint_url } from '../utils/index.js';
import { LinkItemSchema } from './schema.js';

/** @typedef {v.InferOutput<typeof TaxonomyEmbedSchema>} WP_Taxonomy_Embed */
export const TaxonomyEmbedSchema = v.object( {
	name: v.string(),
	rest_base: v.string(),
	rest_namespace: v.string(),
	slug: v.string(),
	_links: v.object( {
		'collection': LinkItemSchema,
		'wp:items': LinkItemSchema,
	} ),
} );

/** @typedef {v.InferOutput<typeof TaxonomyViewSchema>} WP_Taxonomy */
export const TaxonomyViewSchema = v.object( v.entriesFromObjects( [
	TaxonomyEmbedSchema,
	v.object( {
		description: v.string(),
		hierarchical: v.boolean(),
		types: v.array( v.string() ),
	} ),
] ) );

/** @typedef {v.InferOutput<typeof TaxonomyEditSchema>} WP_Taxonomy_Edit */
export const TaxonomyEditSchema = v.object( v.entriesFromObjects( [
	TaxonomyViewSchema,
	v.object( {
		capabilities: v.record( v.string(), v.string() ),
		labels: v.object( {
			add_new_item: v.string(),
			add_or_remove_items: v.nullable( v.string() ),
			all_items: v.string(),
			archives: v.optional( v.string() ),
			back_to_items: v.string(),
			choose_from_most_used: v.nullable( v.string() ),
			desc_field_description: v.string(),
			edit_item: v.string(),
			filter_by_item: v.nullable( v.string() ),
			item_link_description: v.string(),
			item_link: v.string(),
			items_list_navigation: v.string(),
			items_list: v.string(),
			menu_name: v.string(),
			most_used: v.string(),
			name_admin_bar: v.string(),
			name_field_description: v.string(),
			name: v.string(),
			new_item_name: v.string(),
			no_terms: v.string(),
			not_found: v.string(),
			parent_field_description: v.nullable( v.string() ),
			parent_item_colon: v.nullable( v.string() ),
			parent_item: v.string(),
			popular_items: v.nullable( v.string() ),
			search_items: v.string(),
			separate_items_with_commas: v.nullable( v.string() ),
			singular_name: v.string(),
			slug_field_description: v.string(),
			update_item: v.string(),
			view_item: v.string(),
		} ),
		show_cloud: v.boolean(),
		visibility: v.object( {
			public: v.boolean(),
			publicly_queryable: v.boolean(),
			show_admin_column: v.boolean(),
			show_in_nav_menus: v.boolean(),
			show_in_quick_edit: v.boolean(),
			show_ui: v.boolean(),
		} ),
	} ),
] ) );

const TaxQuerySchemas = {
	edit: TaxonomyEditSchema,
	embed: TaxonomyEmbedSchema,
	view: TaxonomyViewSchema,
};

/**
 * Generate URL for taxonomy requests
 *
 * @since 0.3.0
 *
 * @param {string} url WP API root URL.
 * @param {import('$types').Context_Arg|undefined} context Request context, defaults to 'view'.
 * @param {string|undefined} name Taxonomy name.
 *
 * @return {URL} Endpoint URL.
 */
function generate_url( url, context = undefined, name = '' ) {
	return generate_endpoint_url( `${ url }/wp/v2/taxonomies`, context, name );
}

/**
 * Get taxonomies
 *
 * @since 0.1.0
 *
 * @template {keyof typeof TaxQuerySchemas} C
 *
 * @param {string} url WordPress API root URL.
 * @param {C} context Request context, defaults to 'view'.
 * @param {string|undefined} auth Authorization header.
 * @param {import("$types").Fetch_Taxonomies_Args|undefined} args Request arguments.
 *
 * @throws {Error|v.ValiError}
 *
 * @return {Promise<v.InferOutput<v.ArraySchema<typeof TaxQuerySchemas[C], undefined>>>} Taxonomy collection.
 */
export async function get_taxonomies( url, context, auth = '', args = undefined ) {
	const data = await fetch_and_parse(
		v.record( v.string(), TaxQuerySchemas[ context ] ),
		() => {
			// @ts-expect-error TODO
			return fetch_data( generate_url( url, context ), auth, args );
		},
	);

	return Object.values( data );
}

/**
 * Get single taxonomy
 *
 * @since 0.2.0
 *
 * @template {keyof typeof TaxQuerySchemas} C
 *
 * @param {string} name Taxonomy name.
 * @param {string} url WordPress API root URL.
 * @param {C} context Request context, defaults to 'view'.
 * @param {string|undefined} auth Authorization header.
 *
 * @throws {Error|v.ValiError}
 *
 * @return {Promise<v.InferOutput<TaxQuerySchemas[C]>>} Taxonomy collection.
 */
export async function get_single_taxonomy( name, url, context, auth = '' ) {
	return fetch_and_parse(
		TaxQuerySchemas[ context ],
		() => fetch_data( generate_url( url, context, name ), auth ),
	);
}
