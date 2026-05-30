import * as v from 'valibot';
import { fetch_and_parse, fetch_data, generate_endpoint_url, get_fetch } from '../utils/index.js';
import { PostEditBaseSchema, PostEmbedSchema, PostViewSchema } from './posts.js';
import { RenderableItemSchema, UrlSchema } from './schema.js';

/** @typedef {v.InferOutput<typeof ImageSizeSchema>} WP_Image_Size */
export const ImageSizeSchema = v.object( {
	file: v.string(),
	height: v.number(),
	mime_type: v.string(),
	source_url: UrlSchema,
	width: v.number(),
} );

/** @typedef {v.InferOutput<typeof MediaEmbedSchema>} WP_Media_Embed */
export const MediaEmbedSchema = v.object( v.entriesFromObjects( [
	v.omit( PostEmbedSchema, [ 'excerpt', 'featured_media' ] ),
	v.object( {
		alt_text: v.string(),
		caption: RenderableItemSchema,
		media_type: v.string(),
		media_details: v.object( {
			// Video.
			bitrate: v.optional( v.number() ),
			// Video.
			dataformat: v.optional( v.string() ),
			// Image.
			file: v.optional( v.string() ),
			// Video.
			fileformat: v.optional( v.string() ),
			// Image.
			filesize: v.number(),
			// Image.
			height: v.optional( v.number() ),
			// Image.
			image_meta: v.optional( v.record( v.string(), v.any() ) ),
			// Video.
			length: v.optional( v.number() ),
			// Video.
			length_formatted: v.optional( v.string() ),
			// Image.
			width: v.optional( v.number() ),
			// Image.
			sizes: v.optional( v.record( v.string(), ImageSizeSchema ) ),
		} ),
		mime_type: v.string(),
		source_url: UrlSchema,
	} ),
] ) );

/** @typedef {v.InferOutput<typeof MediaViewSchema>} WP_Media */
export const MediaViewSchema = v.object( v.entriesFromObjects( [
	MediaEmbedSchema,
	v.object( {
		description: RenderableItemSchema,
		post: v.nullable( v.number() ),
	} ),
	v.omit( PostViewSchema, [
		'content',
		'excerpt',
		'featured_media',
		'menu_order',
		'parent',
		'sticky',
	] ),
] ) );

/** @typedef {v.InferOutput<typeof MediaEditSchema>} WP_Media_Edit */
export const MediaEditSchema = v.object( v.entriesFromObjects( [
	MediaViewSchema,
	PostEditBaseSchema,
] ) );

const MediaQuerySchemas = {
	edit: MediaEditSchema,
	embed: MediaEmbedSchema,
	view: MediaViewSchema,
};

/**
 * Generate URL for media requests
 *
 * @param {string} url WP API root URL.
 * @param {import('$types').Context_Arg|undefined} context Request context, defaults to 'view'
 * @param {number|undefined} id Media ID.
 *
 * @return {URL} Endpoint URL.
 */
function generate_url( url, context = undefined, id = undefined ) {
	return generate_endpoint_url( `${ url }/wp/v2/media`, context, id );
}

/**
 * Create media
 *
 * @since 0.1.0
 *
 * @param {string} url WordPress API root URL.
 * @param {string} auth Autorization header.
 * @param {FormData} data Form data.
 *
 * @return {Promise<WP_Media_Edit>} Media (edit) data.
 */
export function create_media( url, auth, data ) {
	return fetch_and_parse( MediaEditSchema, () => {
		return get_fetch()( `${ url }/wp/v2/media`, {
			body: data,
			method: 'POST',
			headers: {
				Accept: 'application/json',
				Authorization: auth,
			},
		} );
	} );
}

/**
 * Get media
 *
 * @since 0.2.0
 *
 * @template {keyof typeof MediaQuerySchemas} C
 *
 * @param {string} url WordPress API root URL.
 * @param {C} context Request context, defaults to 'view'.
 * @param {string|undefined} auth Authorization header.
 * @param {import('$types').Fetch_Media_Args|undefined} args Request arguments.
 *
 * @throws {Error|v.ValiError|import('../utils/index.js').WP_REST_Error} JSON.parse error, Valibot error or WP API error.
 *
 * @return {Promise<v.InferOutput<v.ArraySchema<typeof MediaQuerySchemas[C], undefined>>>} Media collection.
 */
export async function get_media( url, context, auth = '', args = undefined ) {
	return fetch_and_parse(
		v.array( MediaQuerySchemas[ context ] ),
		() => fetch_data( generate_url( url, context ), auth, args ),
	);
}

/**
 * Get single media
 *
 * @since 0.2.0
 *
 * @template {keyof typeof MediaQuerySchemas} C
 *
 * @param {number} id Media ID.
 * @param {string} url WordPress API root URL.
 * @param {C} context Request context, defaults to 'view'.
 * @param {string|undefined} auth Authorization header.
 *
 * @throws {Error|v.ValiError|import('../utils/index.js').WP_REST_Error} JSON.parse error, Valibot error or WP API error.
 *
 * @return {Promise<v.InferOutput<typeof MediaQuerySchemas[C]>>} Single media data.
 */
export async function get_single_media( id, url, context, auth = '' ) {
	return fetch_and_parse(
		MediaQuerySchemas[ context ],
		() => fetch_data( generate_url( url, context, id ), auth ),
	);
}
