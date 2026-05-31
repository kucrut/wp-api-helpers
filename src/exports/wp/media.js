/** @import {ArraySchema, InferOutput, ValiError} from "valibot" */
/** @import {WP_REST_Error} from "../utils/index.js" */

import { any, array, entriesFromObjects, nullable, number, object, omit, optional, record, string } from 'valibot';
import { fetch_and_parse, fetch_data, generate_endpoint_url, get_fetch } from '../utils/index.js';
import { PostEditBaseSchema, PostEmbedSchema, PostViewSchema } from './posts.js';
import { RenderableItemSchema, UrlSchema } from './schema.js';

/** @typedef {InferOutput<typeof ImageSizeSchema>} WP_Image_Size */
export const ImageSizeSchema = object( {
	file: string(),
	height: number(),
	mime_type: string(),
	source_url: UrlSchema,
	width: number(),
} );

/** @typedef {InferOutput<typeof MediaEmbedSchema>} WP_Media_Embed */
export const MediaEmbedSchema = object( entriesFromObjects( [
	omit( PostEmbedSchema, [ 'excerpt', 'featured_media' ] ),
	object( {
		alt_text: string(),
		caption: RenderableItemSchema,
		media_type: string(),
		media_details: object( {
			// Video.
			bitrate: optional( number() ),
			// Video.
			dataformat: optional( string() ),
			// Image.
			file: optional( string() ),
			// Video.
			fileformat: optional( string() ),
			// Image.
			filesize: number(),
			// Image.
			height: optional( number() ),
			// Image.
			image_meta: optional( record( string(), any() ) ),
			// Video.
			length: optional( number() ),
			// Video.
			length_formatted: optional( string() ),
			// Image.
			width: optional( number() ),
			// Image.
			sizes: optional( record( string(), ImageSizeSchema ) ),
		} ),
		mime_type: string(),
		source_url: UrlSchema,
	} ),
] ) );

/** @typedef {InferOutput<typeof MediaViewSchema>} WP_Media */
export const MediaViewSchema = object( entriesFromObjects( [
	MediaEmbedSchema,
	object( {
		description: RenderableItemSchema,
		post: nullable( number() ),
	} ),
	omit( PostViewSchema, [
		'content',
		'excerpt',
		'featured_media',
		'menu_order',
		'parent',
		'sticky',
	] ),
] ) );

/** @typedef {InferOutput<typeof MediaEditSchema>} WP_Media_Edit */
export const MediaEditSchema = object( entriesFromObjects( [
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
 * @throws {Error|ValiError|WP_REST_Error} JSON.parse error, Valibot error or WP API error.
 *
 * @return {Promise<InferOutput<ArraySchema<typeof MediaQuerySchemas[C], undefined>>>} Media collection.
 */
export async function get_media( url, context, auth = '', args = undefined ) {
	return fetch_and_parse(
		array( MediaQuerySchemas[ context ] ),
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
 * @throws {Error|ValiError|WP_REST_Error} JSON.parse error, Valibot error or WP API error.
 *
 * @return {Promise<InferOutput<typeof MediaQuerySchemas[C]>>} Single media data.
 */
export async function get_single_media( id, url, context, auth = '' ) {
	return fetch_and_parse(
		MediaQuerySchemas[ context ],
		() => fetch_data( generate_url( url, context, id ), auth ),
	);
}
