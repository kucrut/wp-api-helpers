import { fetch_and_parse, fetch_data, generate_endpoint_url } from '../utils/index.js';
import { link_item } from './schema.js';
import { z } from 'zod';

export const taxonomy_embed = z.object( {
	name: z.string(),
	rest_base: z.string(),
	rest_namespace: z.string(),
	slug: z.string(),
	_links: z.object( {
		'collection': link_item,
		'wp:items': link_item,
	} ),
} );

export const taxonomy_view = taxonomy_embed.extend( {
	description: z.string(),
	hierarchical: z.boolean(),
	types: z.string().array(),
} );

export const taxonomy_edit = taxonomy_view.extend( {
	capabilities: z.record( z.string() ),
	labels: z.object( {
		add_new_item: z.string(),
		add_or_remove_items: z.string().nullable(),
		all_items: z.string(),
		archives: z.string().optional(),
		back_to_items: z.string(),
		choose_from_most_used: z.string().nullable(),
		desc_field_description: z.string(),
		edit_item: z.string(),
		filter_by_item: z.string().nullable(),
		item_link_description: z.string(),
		item_link: z.string(),
		items_list_navigation: z.string(),
		items_list: z.string(),
		menu_name: z.string(),
		most_used: z.string(),
		name_admin_bar: z.string(),
		name_field_description: z.string(),
		name: z.string(),
		new_item_name: z.string(),
		no_terms: z.string(),
		not_found: z.string(),
		parent_field_description: z.string().nullable(),
		parent_item_colon: z.string().nullable(),
		parent_item: z.string(),
		popular_items: z.string().nullable(),
		search_items: z.string(),
		separate_items_with_commas: z.string().nullable(),
		singular_name: z.string(),
		slug_field_description: z.string(),
		update_item: z.string(),
		view_item: z.string(),
	} ),
	show_cloud: z.boolean(),
	visibility: z.object( {
		public: z.boolean(),
		publicly_queryable: z.boolean(),
		show_admin_column: z.boolean(),
		show_in_nav_menus: z.boolean(),
		show_in_quick_edit: z.boolean(),
		show_ui: z.boolean(),
	} ),
} );

/** @typedef {z.infer<taxonomy_view>} WP_Taxonomy */
/** @typedef {z.infer<taxonomy_edit>} WP_Taxonomy_Edit */
/** @typedef {z.infer<taxonomy_embed>} WP_Taxonomy_Embed */

/**
 * Generate URL for taxonomy requests
 *
 * @since 0.3.0
 *
 * @param {string} url WP API root URL.
 * @param {import('$types').Context_Arg} context Request context.
 * @param {string=} name Taxonomy name.
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
 * @param {string} url WordPress API root URL.
 * @param {string=} auth Authorization header.
 * @param {import("$types").Fetch_Taxonomies_Args=} args Request arguments.
 *
 * @throws {Error|import('zod').ZodError}
 *
 * @return {Promise<import('zod').infer<typeof taxonomies_view>>} Taxonomies (view) data.
 */
export async function get_taxonomies( url, auth, args ) {
	return fetch_and_parse( z.record( taxonomy_view ), () => fetch_data( `${ url }/wp/v2/taxonomies`, auth, args ) );
}

/**
 * Get single taxonomy
 *
 * @since 0.2.0
 *
 * @param {string}  name Taxonomy name.
 * @param {string}  url  WordPress API root URL.
 * @param {string=} auth Authorization header.
 *
 * @throws {Error|import('zod').ZodError}
 *
 * @return {Promise<import('zod').infer<typeof taxonomy_view>>} Taxonomies (view) data.
 */
export async function get_taxonomy( name, url, auth ) {
	return fetch_and_parse( taxonomy_view, () => fetch_data( `${ url }/wp/v2/taxonomies/${ name }`, auth ) );
}
