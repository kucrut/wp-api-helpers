/** @import {ArraySchema, InferOutput} from "valibot" */

import { array, boolean, entriesFromObjects, nullable, object, optional, record, string } from 'valibot';
import { fetch_and_parse, fetch_data, generate_endpoint_url } from '../utils/index.js';
import { LinkItemSchema } from './schema.js';

/** @typedef {InferOutput<typeof TaxonomyEmbedSchema>} WP_Taxonomy_Embed */
export const TaxonomyEmbedSchema = object( {
	name: string(),
	rest_base: string(),
	rest_namespace: string(),
	slug: string(),
	_links: object( {
		'collection': LinkItemSchema,
		'wp:items': LinkItemSchema,
	} ),
} );

/** @typedef {InferOutput<typeof TaxonomyViewSchema>} WP_Taxonomy */
export const TaxonomyViewSchema = object( entriesFromObjects( [
	TaxonomyEmbedSchema,
	object( {
		description: string(),
		hierarchical: boolean(),
		types: array( string() ),
	} ),
] ) );

/** @typedef {InferOutput<typeof TaxonomyEditSchema>} WP_Taxonomy_Edit */
export const TaxonomyEditSchema = object( entriesFromObjects( [
	TaxonomyViewSchema,
	object( {
		capabilities: record( string(), string() ),
		labels: object( {
			add_new_item: string(),
			add_or_remove_items: nullable( string() ),
			all_items: string(),
			archives: optional( string() ),
			back_to_items: string(),
			choose_from_most_used: nullable( string() ),
			desc_field_description: string(),
			edit_item: string(),
			filter_by_item: nullable( string() ),
			item_link_description: string(),
			item_link: string(),
			items_list_navigation: string(),
			items_list: string(),
			menu_name: string(),
			most_used: string(),
			name_admin_bar: string(),
			name_field_description: string(),
			name: string(),
			new_item_name: string(),
			no_terms: string(),
			not_found: string(),
			parent_field_description: nullable( string() ),
			parent_item_colon: nullable( string() ),
			parent_item: string(),
			popular_items: nullable( string() ),
			search_items: string(),
			separate_items_with_commas: nullable( string() ),
			singular_name: string(),
			slug_field_description: string(),
			update_item: string(),
			view_item: string(),
		} ),
		show_cloud: boolean(),
		visibility: object( {
			public: boolean(),
			publicly_queryable: boolean(),
			show_admin_column: boolean(),
			show_in_nav_menus: boolean(),
			show_in_quick_edit: boolean(),
			show_ui: boolean(),
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
 * @return {Promise<InferOutput<ArraySchema<typeof TaxQuerySchemas[C], undefined>>>} Taxonomy collection.
 */
export async function get_taxonomies( url, context, auth = '', args = undefined ) {
	const data = await fetch_and_parse(
		record( string(), TaxQuerySchemas[ context ] ),
		() => {
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
 * @return {Promise<InferOutput<TaxQuerySchemas[C]>>} Taxonomy collection.
 */
export async function get_single_taxonomy( name, url, context, auth = '' ) {
	return fetch_and_parse(
		TaxQuerySchemas[ context ],
		() => fetch_data( generate_url( url, context, name ), auth ),
	);
}
