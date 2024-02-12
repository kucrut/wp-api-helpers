import { z } from 'zod';

export const comment_ping_status = z.enum( [ 'open', 'closed' ] );

export const date_item = z.coerce.date();

export const link_item = z.array(
	z.object( {
		embeddable: z.boolean().optional(),
		href: z.string().url(),
		templated: z.boolean().optional(),
		type: z.string().optional(),
	} ),
);

// NOTE: When meta is an array it shouldn't have any value, hence the never type.
export const meta = z.record( z.any() ).or( z.array( z.never() ) ).optional();

export const renderable_item = z.object( {
	block_version: z.number().optional(),
	protected: z.boolean().optional(),
	raw: z.string().optional(),
	rendered: z.string(),
} );

export const rest_error = z.object( {
	code: z.string(),
	message: z.string(),
	data: z.object( {
		status: z.number(),
	} ),
} );

export const settings = z.object( {
	date_format: z.string(),
	default_category: z.number(),
	default_comment_status: z.enum( [ 'open', 'closed' ] ),
	default_ping_status: z.enum( [ 'open', 'closed' ] ),
	default_post_format: z.string(),
	description: z.string(),
	email: z.string().email(),
	language: z.string(),
	page_for_posts: z.number(),
	page_on_front: z.number(),
	posts_per_page: z.number(),
	show_on_front: z.enum( [ 'page', 'posts' ] ),
	site_icon: z.number().nullable(),
	site_logo: z.number().nullable(),
	start_of_week: z.number(),
	time_format: z.string(),
	timezone: z.string(),
	title: z.string(),
	url: z.string(),
	use_smilies: z.boolean(),
} );

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

export const taxonomies_embed = z.record( taxonomy_embed );
export const taxonomies_view = z.record( taxonomy_view );
export const taxonomies_edit = z.record( taxonomy_edit );

export const term_embed = z.object( {
	id: z.number().min( 1 ),
	link: z.string(),
	name: z.string(),
	slug: z.string(),
	taxonomy: z.string(),
	_links: z.object( {
		'about': link_item,
		'collection': link_item,
		'self': link_item,
		'wp:post_type': link_item,
	} ),
} );

export const term_view = term_embed.extend( {
	meta,
	count: z.number(),
	description: z.string(),
	parent: z.number(),
} );

export const user_embed = z.object( {
	avatar_urls: z.record( z.string().url() ),
	description: z.string(),
	id: z.number().min( 1 ),
	name: z.string().min( 1 ),
	url: z.string().url(),
	slug: z.string(),
	_links: z.object( {
		self: link_item,
		collection: link_item,
	} ),
} );

export const user_view = user_embed.extend( { meta } );

export const user_edit = user_view.extend( {
	capabilities: z.record( z.boolean() ),
	email: z.string().email(),
	extra_capabilities: z.record( z.boolean() ),
	first_name: z.string(),
	last_name: z.string(),
	link: z.string().url(),
	locale: z.string(),
	nickname: z.string(),
	registered_date: z.string().datetime( { offset: true } ),
	roles: z.string().array(),
	username: z.string(),
} );
