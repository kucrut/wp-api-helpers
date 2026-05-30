declare module '@kucrut/wp-api-helpers' {
	import * as v from 'valibot';
	/**
	 * Get application password authorization endpoint
	 *
	 * @since 0.3.0
	 *
	 * @param url WP API root URL.
	 * @return {Promise<string>} Application password authorization route.
	 *
	 * */
	export function get_app_password_auth_endpoint(url: string): Promise<string>;
	/**
	 * Get application passwords
	 *
	 * @since 0.1.0
	 *
	 * @param url WordPress API root URL.
	 * @param auth Authorization header.
	 * @param user_id User ID or 'me'.
	 * @param context Request context, defaults to 'view'.
	 *
	 * @return {Promise<v.InferOutput<v.ArraySchema<typeof AppPassQuerySchemas[C], undefined>>>} Application password collection.
	 */
	export function get_app_passwords<C extends keyof typeof AppPassQuerySchemas>(url: string, auth: string, user_id: User_ID_Arg, context: C): Promise<InferOutput<ArraySchema<(typeof AppPassQuerySchemas)[C], undefined>>>;
	/**
	 * Get current application password data
	 *
	 * @since 0.1.0
	 *
	 * @param url WordPress API root URL.
	 * @param auth Authorization header.
	 *
	 * @return {Promise<WP_Application_Password>} Response data.
	 */
	export function get_current_app_password(url: string, auth: string): Promise<WP_Application_Password>;
	/**
	 * Delete application password
	 *
	 * @since 0.1.0
	 *
	 * @param url WordPress API root URL.
	 * @param auth Authorization header.
	 * @param user_id User ID or 'me'.
	 * @param uuid Application password UUID.
	 *
	 * @return {Promise<WP_Application_Password_Deleted>} Response data.
	 */
	export function delete_app_password(url: string, auth: string, user_id: User_ID_Arg, uuid: string): Promise<WP_Application_Password_Deleted>;

	export const embed:ObjectSchema<{
		readonly app_id:StringSchema<undefined>;
		readonly name:StringSchema<undefined>;
		readonly uuid:SchemaWithPipe<readonly [StringSchema<undefined>,UuidAction<string, undefined>]>;
	}, undefined>;

	export const view:ObjectSchema<{
		readonly name:StringSchema<undefined>;
		readonly uuid:SchemaWithPipe<readonly [StringSchema<undefined>,UuidAction<string, undefined>]>;
		readonly app_id:StringSchema<undefined>;
		readonly created:SchemaWithPipe<readonly [StringSchema<undefined>,ToDateAction<string, undefined>]>;
		readonly last_ip:SchemaWithPipe<readonly [StringSchema<undefined>,IpAction<string, undefined>]>;
		readonly last_used:SchemaWithPipe<readonly [StringSchema<undefined>,ToDateAction<string, undefined>]>;
	}, undefined>;

	export const ApplicationPasswordDeletedSchema:ObjectSchema<{
		readonly deleted:BooleanSchema<undefined>;
		readonly previous:ObjectSchema<{
			readonly name:StringSchema<undefined>;
			readonly uuid:SchemaWithPipe<readonly [StringSchema<undefined>,UuidAction<string, undefined>]>;
			readonly app_id:StringSchema<undefined>;
			readonly created:SchemaWithPipe<readonly [StringSchema<undefined>,ToDateAction<string, undefined>]>;
			readonly last_ip:SchemaWithPipe<readonly [StringSchema<undefined>,IpAction<string, undefined>]>;
			readonly last_used:SchemaWithPipe<readonly [StringSchema<undefined>,ToDateAction<string, undefined>]>;
		}, undefined>;
	}, undefined>;
	export type WP_Application_Password_Embed =InferOutput<typeof embed>;
	export type WP_Application_Password =InferOutput<typeof view>;
	export type WP_Application_Password_Deleted =InferOutput<typeof ApplicationPasswordDeletedSchema>;
	namespace AppPassQuerySchemas {
		export { view as edit };
		export { embed as embed };
		export { view as view };
	}
	/**
	 * Discover WordPress API root URL
	 *
	 * @since 0.1.0
	 *
	 * @param url WordPress URL.
	 *
	 * @return {Promise<string>} WordPress API root URL.
	 */
	export function discover(url: string): Promise<string>;
	/**
	 * Get site info
	 *
	 * @since 0.2.0
	 *
	 * @param url WordPress API root URL.
	 * @param auth Authorization header.
	 *
	 * @return {Promise<WP_Info>} Site info data.
	 */
	export function get_info(url: string, auth?: string): Promise<WP_Info>;

	export const InfoSchema:ObjectSchema<{
		readonly description:StringSchema<undefined>;
		readonly gmt_offset:SchemaWithPipe<readonly [StringSchema<undefined>,ToNumberAction<string, undefined>]>;
		readonly home:SchemaWithPipe<readonly [StringSchema<undefined>,UrlAction<string, undefined>]>;
		readonly name:StringSchema<undefined>;
		readonly namespaces:ArraySchema<StringSchema<undefined>, undefined>;
		readonly site_icon_url:SchemaWithPipe<readonly [StringSchema<undefined>,UrlAction<string, undefined>]>;
		readonly site_icon:NumberSchema<undefined>;
		readonly site_logo:NumberSchema<undefined>;
		readonly timezone_string:StringSchema<undefined>;
		readonly url:SchemaWithPipe<readonly [StringSchema<undefined>,UrlAction<string, undefined>]>;
		readonly authentication:RecordSchema<StringSchema<undefined>,ObjectSchema<{
			readonly endpoints:ObjectSchema<{
				readonly authorization:SchemaWithPipe<readonly [StringSchema<undefined>,UrlAction<string, undefined>]>;
			}, undefined>;
		}, undefined>, undefined>;
		readonly _links:RecordSchema<StringSchema<undefined>,ArraySchema<ObjectSchema<{
			readonly embeddable:OptionalSchema<BooleanSchema<undefined>, undefined>;
			readonly href:SchemaWithPipe<readonly [StringSchema<undefined>,UrlAction<string, undefined>]>;
			readonly templated:OptionalSchema<BooleanSchema<undefined>, undefined>;
			readonly type:OptionalSchema<StringSchema<undefined>, undefined>;
		}, undefined>, undefined>, undefined>;
	}, undefined>;
	export type WP_Info =InferOutput<typeof InfoSchema>;
	/**
	 * Get JWT authentication
	 *
	 * @since 0.1.0
	 *
	 * @param url WordPress API root URL.
	 * @param username Username or email.
	 * @param password User password.
	 *
	 * @return {Promise<JWT_Auth>} Auth data.
	 */
	export function get_jwt_auth(url: string, username: string, password: string): Promise<JWT_Auth>;
	/**
	 * Validate JWT token
	 *
	 * @since 0.1.0
	 *
	 * @param url WordPress API root URL.
	 * @param token JWT token.
	 *
	 * @return {Promise<JWT_Valid_Token>} Valid token data.
	 */
	export function get_jwt_validate_token(url: string, token: string): Promise<JWT_Valid_Token>;

	export const JwtAuthDataSchema:ObjectSchema<{
		readonly user_email:SchemaWithPipe<readonly [StringSchema<undefined>,EmailAction<string, undefined>]>;
		readonly user_display_name:StringSchema<undefined>;
		readonly user_nicename:StringSchema<undefined>;
		readonly token:StringSchema<undefined>;
	}, undefined>;

	export const JwtValidTokenSchema:ObjectSchema<{
		readonly code:SchemaWithPipe<readonly [StringSchema<undefined>,CheckAction<string, undefined>]>;
		readonly data:ObjectSchema<{
			readonly status:SchemaWithPipe<readonly [NumberSchema<undefined>,CheckAction<number, undefined>]>;
		}, undefined>;
	}, undefined>;
	export type JWT_Auth =InferOutput<typeof JwtAuthDataSchema>;
	export type JWT_Valid_Token =InferOutput<typeof JwtValidTokenSchema>;
	/**
	 * Create media
	 *
	 * @since 0.1.0
	 *
	 * @param url WordPress API root URL.
	 * @param auth Autorization header.
	 * @param data Form data.
	 *
	 * @return {Promise<WP_Media_Edit>} Media (edit) data.
	 */
	export function create_media(url: string, auth: string, data: FormData): Promise<WP_Media_Edit>;
	/**
	 * Get media
	 *
	 * @since 0.2.0
	 *
	 * @param url WordPress API root URL.
	 * @param context Request context, defaults to 'view'.
	 * @param auth Authorization header.
	 * @param args Request arguments.
	 *
	 * @return {Promise<v.InferOutput<v.ArraySchema<typeof MediaQuerySchemas[C], undefined>>>} Media collection.
	 */
	export function get_media<C extends keyof typeof MediaQuerySchemas>(url: string, context: C, auth?: string | undefined, args?: Fetch_Media_Args | undefined): Promise<InferOutput<ArraySchema<(typeof MediaQuerySchemas)[C], undefined>>>;
	/**
	 * Get single media
	 *
	 * @since 0.2.0
	 *
	 * @param id Media ID.
	 * @param url WordPress API root URL.
	 * @param context Request context, defaults to 'view'.
	 * @param auth Authorization header.
	 *
	 * @return {Promise<v.InferOutput<typeof MediaQuerySchemas[C]>>} Single media data.
	 */
	export function get_single_media<C extends keyof typeof MediaQuerySchemas>(id: number, url: string, context: C, auth?: string | undefined): Promise<InferOutput<(typeof MediaQuerySchemas)[C]>>;

	export const ImageSizeSchema:ObjectSchema<{
		readonly file:StringSchema<undefined>;
		readonly height:NumberSchema<undefined>;
		readonly mime_type:StringSchema<undefined>;
		readonly source_url:SchemaWithPipe<readonly [StringSchema<undefined>,UrlAction<string, undefined>]>;
		readonly width:NumberSchema<undefined>;
	}, undefined>;

	export const MediaEmbedSchema:ObjectSchema<{
		readonly link:SchemaWithPipe<readonly [StringSchema<undefined>,UrlAction<string, undefined>]>;
		readonly type:StringSchema<undefined>;
		readonly id:NumberSchema<undefined>;
		readonly title:ObjectSchema<{
			readonly block_version:OptionalSchema<NumberSchema<undefined>, undefined>;
			readonly protected:OptionalSchema<BooleanSchema<undefined>, undefined>;
			readonly raw:OptionalSchema<StringSchema<undefined>, undefined>;
			readonly rendered:StringSchema<undefined>;
		}, undefined>;
		readonly date:SchemaWithPipe<readonly [StringSchema<undefined>,ToDateAction<string, undefined>]>;
		readonly slug:StringSchema<undefined>;
		readonly author:SchemaWithPipe<readonly [NumberSchema<undefined>,MinValueAction<number, 1, undefined>]>;
		readonly _links:OptionalSchema<RecordSchema<StringSchema<undefined>,ArraySchema<ObjectSchema<{
			readonly embeddable:OptionalSchema<BooleanSchema<undefined>, undefined>;
			readonly href:SchemaWithPipe<readonly [StringSchema<undefined>,UrlAction<string, undefined>]>;
			readonly templated:OptionalSchema<BooleanSchema<undefined>, undefined>;
			readonly type:OptionalSchema<StringSchema<undefined>, undefined>;
		}, undefined>, undefined>, undefined>, undefined>;
		readonly alt_text:StringSchema<undefined>;
		readonly caption:ObjectSchema<{
			readonly block_version:OptionalSchema<NumberSchema<undefined>, undefined>;
			readonly protected:OptionalSchema<BooleanSchema<undefined>, undefined>;
			readonly raw:OptionalSchema<StringSchema<undefined>, undefined>;
			readonly rendered:StringSchema<undefined>;
		}, undefined>;
		readonly media_type:StringSchema<undefined>;
		readonly media_details:ObjectSchema<{
			readonly bitrate:OptionalSchema<NumberSchema<undefined>, undefined>;
			readonly dataformat:OptionalSchema<StringSchema<undefined>, undefined>;
			readonly file:OptionalSchema<StringSchema<undefined>, undefined>;
			readonly fileformat:OptionalSchema<StringSchema<undefined>, undefined>;
			readonly filesize:NumberSchema<undefined>;
			readonly height:OptionalSchema<NumberSchema<undefined>, undefined>;
			readonly image_meta:OptionalSchema<RecordSchema<StringSchema<undefined>,AnySchema, undefined>, undefined>;
			readonly length:OptionalSchema<NumberSchema<undefined>, undefined>;
			readonly length_formatted:OptionalSchema<StringSchema<undefined>, undefined>;
			readonly width:OptionalSchema<NumberSchema<undefined>, undefined>;
			readonly sizes:OptionalSchema<RecordSchema<StringSchema<undefined>,ObjectSchema<{
				readonly file:StringSchema<undefined>;
				readonly height:NumberSchema<undefined>;
				readonly mime_type:StringSchema<undefined>;
				readonly source_url:SchemaWithPipe<readonly [StringSchema<undefined>,UrlAction<string, undefined>]>;
				readonly width:NumberSchema<undefined>;
			}, undefined>, undefined>, undefined>;
		}, undefined>;
		readonly mime_type:StringSchema<undefined>;
		readonly source_url:SchemaWithPipe<readonly [StringSchema<undefined>,UrlAction<string, undefined>]>;
	}, undefined>;

	export const MediaViewSchema:ObjectSchema<{
		readonly caption:ObjectSchema<{
			readonly block_version:OptionalSchema<NumberSchema<undefined>, undefined>;
			readonly protected:OptionalSchema<BooleanSchema<undefined>, undefined>;
			readonly raw:OptionalSchema<StringSchema<undefined>, undefined>;
			readonly rendered:StringSchema<undefined>;
		}, undefined>;
		readonly mime_type:StringSchema<undefined>;
		readonly media_type:StringSchema<undefined>;
		readonly source_url:SchemaWithPipe<readonly [StringSchema<undefined>,UrlAction<string, undefined>]>;
		readonly media_details:ObjectSchema<{
			readonly bitrate:OptionalSchema<NumberSchema<undefined>, undefined>;
			readonly dataformat:OptionalSchema<StringSchema<undefined>, undefined>;
			readonly file:OptionalSchema<StringSchema<undefined>, undefined>;
			readonly fileformat:OptionalSchema<StringSchema<undefined>, undefined>;
			readonly filesize:NumberSchema<undefined>;
			readonly height:OptionalSchema<NumberSchema<undefined>, undefined>;
			readonly image_meta:OptionalSchema<RecordSchema<StringSchema<undefined>,AnySchema, undefined>, undefined>;
			readonly length:OptionalSchema<NumberSchema<undefined>, undefined>;
			readonly length_formatted:OptionalSchema<StringSchema<undefined>, undefined>;
			readonly width:OptionalSchema<NumberSchema<undefined>, undefined>;
			readonly sizes:OptionalSchema<RecordSchema<StringSchema<undefined>,ObjectSchema<{
				readonly file:StringSchema<undefined>;
				readonly height:NumberSchema<undefined>;
				readonly mime_type:StringSchema<undefined>;
				readonly source_url:SchemaWithPipe<readonly [StringSchema<undefined>,UrlAction<string, undefined>]>;
				readonly width:NumberSchema<undefined>;
			}, undefined>, undefined>, undefined>;
		}, undefined>;
		readonly alt_text:StringSchema<undefined>;
		readonly description:ObjectSchema<{
			readonly block_version:OptionalSchema<NumberSchema<undefined>, undefined>;
			readonly protected:OptionalSchema<BooleanSchema<undefined>, undefined>;
			readonly raw:OptionalSchema<StringSchema<undefined>, undefined>;
			readonly rendered:StringSchema<undefined>;
		}, undefined>;
		readonly post:NullableSchema<NumberSchema<undefined>, undefined>;
		readonly link:SchemaWithPipe<readonly [StringSchema<undefined>,UrlAction<string, undefined>]>;
		readonly type:StringSchema<undefined>;
		readonly format:OptionalSchema<StringSchema<undefined>, undefined>;
		readonly id:NumberSchema<undefined>;
		readonly meta:OptionalSchema<UnionSchema<[AnySchema,ArraySchema<NeverSchema<undefined>, undefined>], undefined>, undefined>;
		readonly template:StringSchema<undefined>;
		readonly title:ObjectSchema<{
			readonly block_version:OptionalSchema<NumberSchema<undefined>, undefined>;
			readonly protected:OptionalSchema<BooleanSchema<undefined>, undefined>;
			readonly raw:OptionalSchema<StringSchema<undefined>, undefined>;
			readonly rendered:StringSchema<undefined>;
		}, undefined>;
		readonly status:StringSchema<undefined>;
		readonly date:SchemaWithPipe<readonly [StringSchema<undefined>,ToDateAction<string, undefined>]>;
		readonly slug:StringSchema<undefined>;
		readonly author:SchemaWithPipe<readonly [NumberSchema<undefined>,MinValueAction<number, 1, undefined>]>;
		readonly modified:SchemaWithPipe<readonly [StringSchema<undefined>,ToDateAction<string, undefined>]>;
		readonly _links:OptionalSchema<RecordSchema<StringSchema<undefined>,ArraySchema<ObjectSchema<{
			readonly embeddable:OptionalSchema<BooleanSchema<undefined>, undefined>;
			readonly href:SchemaWithPipe<readonly [StringSchema<undefined>,UrlAction<string, undefined>]>;
			readonly templated:OptionalSchema<BooleanSchema<undefined>, undefined>;
			readonly type:OptionalSchema<StringSchema<undefined>, undefined>;
		}, undefined>, undefined>, undefined>, undefined>;
		readonly guid:ObjectSchema<{
			readonly raw:OptionalSchema<SchemaWithPipe<readonly [StringSchema<undefined>,UrlAction<string, undefined>]>, undefined>;
			readonly rendered:SchemaWithPipe<readonly [StringSchema<undefined>,UrlAction<string, undefined>]>;
		}, undefined>;
		readonly comment_status:PicklistSchema<["open", "closed"], undefined>;
		readonly date_gmt:SchemaWithPipe<readonly [StringSchema<undefined>,ToDateAction<string, undefined>]>;
		readonly modified_gmt:SchemaWithPipe<readonly [StringSchema<undefined>,ToDateAction<string, undefined>]>;
		readonly ping_status:PicklistSchema<["open", "closed"], undefined>;
	}, undefined>;

	export const MediaEditSchema:ObjectSchema<{
		readonly link:SchemaWithPipe<readonly [StringSchema<undefined>,UrlAction<string, undefined>]>;
		readonly type:StringSchema<undefined>;
		readonly format:OptionalSchema<StringSchema<undefined>, undefined>;
		readonly id:NumberSchema<undefined>;
		readonly caption:ObjectSchema<{
			readonly block_version:OptionalSchema<NumberSchema<undefined>, undefined>;
			readonly protected:OptionalSchema<BooleanSchema<undefined>, undefined>;
			readonly raw:OptionalSchema<StringSchema<undefined>, undefined>;
			readonly rendered:StringSchema<undefined>;
		}, undefined>;
		readonly meta:OptionalSchema<UnionSchema<[AnySchema,ArraySchema<NeverSchema<undefined>, undefined>], undefined>, undefined>;
		readonly template:StringSchema<undefined>;
		readonly title:ObjectSchema<{
			readonly block_version:OptionalSchema<NumberSchema<undefined>, undefined>;
			readonly protected:OptionalSchema<BooleanSchema<undefined>, undefined>;
			readonly raw:OptionalSchema<StringSchema<undefined>, undefined>;
			readonly rendered:StringSchema<undefined>;
		}, undefined>;
		readonly description:ObjectSchema<{
			readonly block_version:OptionalSchema<NumberSchema<undefined>, undefined>;
			readonly protected:OptionalSchema<BooleanSchema<undefined>, undefined>;
			readonly raw:OptionalSchema<StringSchema<undefined>, undefined>;
			readonly rendered:StringSchema<undefined>;
		}, undefined>;
		readonly status:StringSchema<undefined>;
		readonly date:SchemaWithPipe<readonly [StringSchema<undefined>,ToDateAction<string, undefined>]>;
		readonly mime_type:StringSchema<undefined>;
		readonly slug:StringSchema<undefined>;
		readonly author:SchemaWithPipe<readonly [NumberSchema<undefined>,MinValueAction<number, 1, undefined>]>;
		readonly modified:SchemaWithPipe<readonly [StringSchema<undefined>,ToDateAction<string, undefined>]>;
		readonly media_type:StringSchema<undefined>;
		readonly post:NullableSchema<NumberSchema<undefined>, undefined>;
		readonly _links:OptionalSchema<RecordSchema<StringSchema<undefined>,ArraySchema<ObjectSchema<{
			readonly embeddable:OptionalSchema<BooleanSchema<undefined>, undefined>;
			readonly href:SchemaWithPipe<readonly [StringSchema<undefined>,UrlAction<string, undefined>]>;
			readonly templated:OptionalSchema<BooleanSchema<undefined>, undefined>;
			readonly type:OptionalSchema<StringSchema<undefined>, undefined>;
		}, undefined>, undefined>, undefined>, undefined>;
		readonly guid:ObjectSchema<{
			readonly raw:OptionalSchema<SchemaWithPipe<readonly [StringSchema<undefined>,UrlAction<string, undefined>]>, undefined>;
			readonly rendered:SchemaWithPipe<readonly [StringSchema<undefined>,UrlAction<string, undefined>]>;
		}, undefined>;
		readonly comment_status:PicklistSchema<["open", "closed"], undefined>;
		readonly date_gmt:SchemaWithPipe<readonly [StringSchema<undefined>,ToDateAction<string, undefined>]>;
		readonly modified_gmt:SchemaWithPipe<readonly [StringSchema<undefined>,ToDateAction<string, undefined>]>;
		readonly ping_status:PicklistSchema<["open", "closed"], undefined>;
		readonly source_url:SchemaWithPipe<readonly [StringSchema<undefined>,UrlAction<string, undefined>]>;
		readonly media_details:ObjectSchema<{
			readonly bitrate:OptionalSchema<NumberSchema<undefined>, undefined>;
			readonly dataformat:OptionalSchema<StringSchema<undefined>, undefined>;
			readonly file:OptionalSchema<StringSchema<undefined>, undefined>;
			readonly fileformat:OptionalSchema<StringSchema<undefined>, undefined>;
			readonly filesize:NumberSchema<undefined>;
			readonly height:OptionalSchema<NumberSchema<undefined>, undefined>;
			readonly image_meta:OptionalSchema<RecordSchema<StringSchema<undefined>,AnySchema, undefined>, undefined>;
			readonly length:OptionalSchema<NumberSchema<undefined>, undefined>;
			readonly length_formatted:OptionalSchema<StringSchema<undefined>, undefined>;
			readonly width:OptionalSchema<NumberSchema<undefined>, undefined>;
			readonly sizes:OptionalSchema<RecordSchema<StringSchema<undefined>,ObjectSchema<{
				readonly file:StringSchema<undefined>;
				readonly height:NumberSchema<undefined>;
				readonly mime_type:StringSchema<undefined>;
				readonly source_url:SchemaWithPipe<readonly [StringSchema<undefined>,UrlAction<string, undefined>]>;
				readonly width:NumberSchema<undefined>;
			}, undefined>, undefined>, undefined>;
		}, undefined>;
		readonly alt_text:StringSchema<undefined>;
		readonly generated_slug:StringSchema<undefined>;
		readonly permalink_template:StringSchema<undefined>;
	}, undefined>;
	export type WP_Image_Size =InferOutput<typeof ImageSizeSchema>;
	export type WP_Media_Embed =InferOutput<typeof MediaEmbedSchema>;
	export type WP_Media =InferOutput<typeof MediaViewSchema>;
	export type WP_Media_Edit =InferOutput<typeof MediaEditSchema>;
	namespace MediaQuerySchemas {
		export { MediaEditSchema as edit };
		export { MediaEmbedSchema as embed };
		export { MediaViewSchema as view };
	}
	/**
	 * Get single post
	 *
	 * @since 0.2.0
	 *
	 * @param id Post ID (optional).
	 * @param url WordPress API root URL.
	 * @param context Request context, defaults to 'view'.
	 * @param auth Authorization header.
	 * @param type Post type, defaults to 'posts'.
	 *
	 * @todo Add args parameter.
	 *
	 * @return {Promise<v.InferOutput<typeof PostQuerySchemas[C]>>} Single post data.
	 */
	export function get_single_post<C extends keyof typeof PostQuerySchemas>(id: number, url: string, context: C, auth?: string, type?: string): Promise<InferOutput<(typeof PostQuerySchemas)[C]>>;
	/**
	 * Get posts
	 *
	 * @since 0.2.0
	 *
	 * @param url WordPress API root URL.
	 * @param context Request context, defaults to 'view'.
	 * @param auth Authorization header.
	 * @param type Post type, defaults to 'posts'.
	 * @param args Request arguments
	 *
	 * @return {Promise<v.InferOutput<v.ArraySchema<typeof PostQuerySchemas[C], undefined>>>} Post collection.
	 */
	export function get_posts<C extends keyof typeof PostQuerySchemas>(url: string, context: C, auth?: string, type?: string, args?: Fetch_Posts_Args | undefined): Promise<InferOutput<ArraySchema<(typeof PostQuerySchemas)[C], undefined>>>;
	/**
	 * Get post terms
	 *
	 * @since 0.2.0
	 *
	 * @param post Post object.
	 * @param auth Authorization header (optional).
	 *
	 * @return {Promise<WP_Post_Terms[]|null>} Array of post terms.
	 */
	export function get_post_terms(post: WP_Post, auth?: string): Promise<WP_Post_Terms[] | null>;
	export const PostEditBaseSchema:ObjectSchema<{
		readonly generated_slug:StringSchema<undefined>;
		readonly permalink_template:StringSchema<undefined>;
	}, undefined>;

	export const PostEmbedSchema:ObjectSchema<{
		readonly author:SchemaWithPipe<readonly [NumberSchema<undefined>,MinValueAction<number, 1, undefined>]>;
		readonly date:SchemaWithPipe<readonly [StringSchema<undefined>,ToDateAction<string, undefined>]>;
		readonly excerpt:ObjectSchema<{
			readonly block_version:OptionalSchema<NumberSchema<undefined>, undefined>;
			readonly protected:OptionalSchema<BooleanSchema<undefined>, undefined>;
			readonly raw:OptionalSchema<StringSchema<undefined>, undefined>;
			readonly rendered:StringSchema<undefined>;
		}, undefined>;
		readonly featured_media:NumberSchema<undefined>;
		readonly id:NumberSchema<undefined>;
		readonly link:SchemaWithPipe<readonly [StringSchema<undefined>,UrlAction<string, undefined>]>;
		readonly slug:StringSchema<undefined>;
		readonly title:ObjectSchema<{
			readonly block_version:OptionalSchema<NumberSchema<undefined>, undefined>;
			readonly protected:OptionalSchema<BooleanSchema<undefined>, undefined>;
			readonly raw:OptionalSchema<StringSchema<undefined>, undefined>;
			readonly rendered:StringSchema<undefined>;
		}, undefined>;
		readonly type:StringSchema<undefined>;
		readonly _links:OptionalSchema<RecordSchema<StringSchema<undefined>,ArraySchema<ObjectSchema<{
			readonly embeddable:OptionalSchema<BooleanSchema<undefined>, undefined>;
			readonly href:SchemaWithPipe<readonly [StringSchema<undefined>,UrlAction<string, undefined>]>;
			readonly templated:OptionalSchema<BooleanSchema<undefined>, undefined>;
			readonly type:OptionalSchema<StringSchema<undefined>, undefined>;
		}, undefined>, undefined>, undefined>, undefined>;
	}, undefined>;

	export const PostViewSchema:ObjectSchema<{
		readonly link:SchemaWithPipe<readonly [StringSchema<undefined>,UrlAction<string, undefined>]>;
		readonly type:StringSchema<undefined>;
		readonly id:NumberSchema<undefined>;
		readonly title:ObjectSchema<{
			readonly block_version:OptionalSchema<NumberSchema<undefined>, undefined>;
			readonly protected:OptionalSchema<BooleanSchema<undefined>, undefined>;
			readonly raw:OptionalSchema<StringSchema<undefined>, undefined>;
			readonly rendered:StringSchema<undefined>;
		}, undefined>;
		readonly date:SchemaWithPipe<readonly [StringSchema<undefined>,ToDateAction<string, undefined>]>;
		readonly slug:StringSchema<undefined>;
		readonly author:SchemaWithPipe<readonly [NumberSchema<undefined>,MinValueAction<number, 1, undefined>]>;
		readonly _links:OptionalSchema<RecordSchema<StringSchema<undefined>,ArraySchema<ObjectSchema<{
			readonly embeddable:OptionalSchema<BooleanSchema<undefined>, undefined>;
			readonly href:SchemaWithPipe<readonly [StringSchema<undefined>,UrlAction<string, undefined>]>;
			readonly templated:OptionalSchema<BooleanSchema<undefined>, undefined>;
			readonly type:OptionalSchema<StringSchema<undefined>, undefined>;
		}, undefined>, undefined>, undefined>, undefined>;
		readonly excerpt:ObjectSchema<{
			readonly block_version:OptionalSchema<NumberSchema<undefined>, undefined>;
			readonly protected:OptionalSchema<BooleanSchema<undefined>, undefined>;
			readonly raw:OptionalSchema<StringSchema<undefined>, undefined>;
			readonly rendered:StringSchema<undefined>;
		}, undefined>;
		readonly featured_media:NumberSchema<undefined>;
		readonly comment_status:PicklistSchema<["open", "closed"], undefined>;
		readonly content:ObjectSchema<{
			readonly block_version:OptionalSchema<NumberSchema<undefined>, undefined>;
			readonly protected:OptionalSchema<BooleanSchema<undefined>, undefined>;
			readonly raw:OptionalSchema<StringSchema<undefined>, undefined>;
			readonly rendered:StringSchema<undefined>;
		}, undefined>;
		readonly date_gmt:SchemaWithPipe<readonly [StringSchema<undefined>,ToDateAction<string, undefined>]>;
		readonly format:OptionalSchema<StringSchema<undefined>, undefined>;
		readonly menu_order:OptionalSchema<NumberSchema<undefined>, undefined>;
		readonly meta:OptionalSchema<UnionSchema<[AnySchema,ArraySchema<NeverSchema<undefined>, undefined>], undefined>, undefined>;
		readonly modified:SchemaWithPipe<readonly [StringSchema<undefined>,ToDateAction<string, undefined>]>;
		readonly modified_gmt:SchemaWithPipe<readonly [StringSchema<undefined>,ToDateAction<string, undefined>]>;
		readonly parent:OptionalSchema<NumberSchema<undefined>, undefined>;
		readonly ping_status:PicklistSchema<["open", "closed"], undefined>;
		readonly status:StringSchema<undefined>;
		readonly sticky:OptionalSchema<BooleanSchema<undefined>, undefined>;
		readonly template:StringSchema<undefined>;
		readonly guid:ObjectSchema<{
			readonly raw:OptionalSchema<SchemaWithPipe<readonly [StringSchema<undefined>,UrlAction<string, undefined>]>, undefined>;
			readonly rendered:SchemaWithPipe<readonly [StringSchema<undefined>,UrlAction<string, undefined>]>;
		}, undefined>;
	}, undefined>;

	export const PostEditSchema:ObjectSchema<{
		readonly link:SchemaWithPipe<readonly [StringSchema<undefined>,UrlAction<string, undefined>]>;
		readonly type:StringSchema<undefined>;
		readonly format:OptionalSchema<StringSchema<undefined>, undefined>;
		readonly id:NumberSchema<undefined>;
		readonly content:ObjectSchema<{
			readonly block_version:OptionalSchema<NumberSchema<undefined>, undefined>;
			readonly protected:OptionalSchema<BooleanSchema<undefined>, undefined>;
			readonly raw:OptionalSchema<StringSchema<undefined>, undefined>;
			readonly rendered:StringSchema<undefined>;
		}, undefined>;
		readonly meta:OptionalSchema<UnionSchema<[AnySchema,ArraySchema<NeverSchema<undefined>, undefined>], undefined>, undefined>;
		readonly template:StringSchema<undefined>;
		readonly title:ObjectSchema<{
			readonly block_version:OptionalSchema<NumberSchema<undefined>, undefined>;
			readonly protected:OptionalSchema<BooleanSchema<undefined>, undefined>;
			readonly raw:OptionalSchema<StringSchema<undefined>, undefined>;
			readonly rendered:StringSchema<undefined>;
		}, undefined>;
		readonly parent:OptionalSchema<NumberSchema<undefined>, undefined>;
		readonly status:StringSchema<undefined>;
		readonly date:SchemaWithPipe<readonly [StringSchema<undefined>,ToDateAction<string, undefined>]>;
		readonly slug:StringSchema<undefined>;
		readonly author:SchemaWithPipe<readonly [NumberSchema<undefined>,MinValueAction<number, 1, undefined>]>;
		readonly sticky:OptionalSchema<BooleanSchema<undefined>, undefined>;
		readonly modified:SchemaWithPipe<readonly [StringSchema<undefined>,ToDateAction<string, undefined>]>;
		readonly _links:OptionalSchema<RecordSchema<StringSchema<undefined>,ArraySchema<ObjectSchema<{
			readonly embeddable:OptionalSchema<BooleanSchema<undefined>, undefined>;
			readonly href:SchemaWithPipe<readonly [StringSchema<undefined>,UrlAction<string, undefined>]>;
			readonly templated:OptionalSchema<BooleanSchema<undefined>, undefined>;
			readonly type:OptionalSchema<StringSchema<undefined>, undefined>;
		}, undefined>, undefined>, undefined>, undefined>;
		readonly excerpt:ObjectSchema<{
			readonly block_version:OptionalSchema<NumberSchema<undefined>, undefined>;
			readonly protected:OptionalSchema<BooleanSchema<undefined>, undefined>;
			readonly raw:OptionalSchema<StringSchema<undefined>, undefined>;
			readonly rendered:StringSchema<undefined>;
		}, undefined>;
		readonly featured_media:NumberSchema<undefined>;
		readonly menu_order:OptionalSchema<NumberSchema<undefined>, undefined>;
		readonly guid:ObjectSchema<{
			readonly raw:OptionalSchema<SchemaWithPipe<readonly [StringSchema<undefined>,UrlAction<string, undefined>]>, undefined>;
			readonly rendered:SchemaWithPipe<readonly [StringSchema<undefined>,UrlAction<string, undefined>]>;
		}, undefined>;
		readonly comment_status:PicklistSchema<["open", "closed"], undefined>;
		readonly date_gmt:SchemaWithPipe<readonly [StringSchema<undefined>,ToDateAction<string, undefined>]>;
		readonly modified_gmt:SchemaWithPipe<readonly [StringSchema<undefined>,ToDateAction<string, undefined>]>;
		readonly ping_status:PicklistSchema<["open", "closed"], undefined>;
		readonly generated_slug:StringSchema<undefined>;
		readonly permalink_template:StringSchema<undefined>;
	}, undefined>;
	export type WP_Post_Terms = {
		taxonomy: WP_Taxonomy;
		terms: WP_Term[];
	};
	export type WP_Post_Embed =InferOutput<typeof PostEmbedSchema>;
	export type WP_Post =InferOutput<typeof PostViewSchema>;
	export type WP_Post_Edit =InferOutput<typeof PostEditSchema>;
	namespace PostQuerySchemas {
		export { PostEditSchema as edit };
		export { PostEmbedSchema as embed };
		export { PostViewSchema as view };
	}
	export const CommentStatusSchema:PicklistSchema<["open", "closed"], undefined>;
	export const DateItemSchema:SchemaWithPipe<readonly [StringSchema<undefined>,ToDateAction<string, undefined>]>;
	export const EmailSchema:SchemaWithPipe<readonly [StringSchema<undefined>,EmailAction<string, undefined>]>;
	export const IdSchema:SchemaWithPipe<readonly [NumberSchema<undefined>,MinValueAction<number, 1, undefined>]>;
	export const UrlSchema:SchemaWithPipe<readonly [StringSchema<undefined>,UrlAction<string, undefined>]>;
	export const LinkItemSchema:ArraySchema<ObjectSchema<{
		readonly embeddable:OptionalSchema<BooleanSchema<undefined>, undefined>;
		readonly href:SchemaWithPipe<readonly [StringSchema<undefined>,UrlAction<string, undefined>]>;
		readonly templated:OptionalSchema<BooleanSchema<undefined>, undefined>;
		readonly type:OptionalSchema<StringSchema<undefined>, undefined>;
	}, undefined>, undefined>;

	export const MetaSchema:OptionalSchema<UnionSchema<[AnySchema,ArraySchema<NeverSchema<undefined>, undefined>], undefined>, undefined>;
	export const RenderableItemSchema:ObjectSchema<{
		readonly block_version:OptionalSchema<NumberSchema<undefined>, undefined>;
		readonly protected:OptionalSchema<BooleanSchema<undefined>, undefined>;
		readonly raw:OptionalSchema<StringSchema<undefined>, undefined>;
		readonly rendered:StringSchema<undefined>;
	}, undefined>;

	export const RestErrorSchema:ObjectSchema<{
		readonly code:StringSchema<undefined>;
		readonly message:StringSchema<undefined>;
		readonly data:ObjectSchema<{
			readonly status:NumberSchema<undefined>;
		}, undefined>;
	}, undefined>;
	export type Meta =InferOutput<typeof MetaSchema>;
	export type RestError =InferOutput<typeof RestErrorSchema>;
	/**
	 * Get settings
	 *
	 * @since 0.2.0
	 *
	 * @param url WordPress API root URL.
	 * @param auth Authorization header.
	 *
	 * @return {Promise<WP_Settings>} Settings data.
	 */
	export function get_settings(url: string, auth: string): Promise<WP_Settings>;

	export const SettingsSchema:ObjectSchema<{
		readonly date_format:StringSchema<undefined>;
		readonly default_category:NumberSchema<undefined>;
		readonly default_comment_status:PicklistSchema<["open", "closed"], undefined>;
		readonly default_ping_status:PicklistSchema<["open", "closed"], undefined>;
		readonly default_post_format:StringSchema<undefined>;
		readonly description:StringSchema<undefined>;
		readonly email:SchemaWithPipe<readonly [StringSchema<undefined>,EmailAction<string, undefined>]>;
		readonly language:StringSchema<undefined>;
		readonly page_for_posts:NumberSchema<undefined>;
		readonly page_on_front:NumberSchema<undefined>;
		readonly posts_per_page:NumberSchema<undefined>;
		readonly show_on_front:PicklistSchema<["page", "posts"], undefined>;
		readonly site_icon:NullableSchema<NumberSchema<undefined>, undefined>;
		readonly site_logo:NullableSchema<NumberSchema<undefined>, undefined>;
		readonly start_of_week:NumberSchema<undefined>;
		readonly time_format:StringSchema<undefined>;
		readonly timezone:StringSchema<undefined>;
		readonly title:StringSchema<undefined>;
		readonly url:StringSchema<undefined>;
		readonly use_smilies:BooleanSchema<undefined>;
	}, undefined>;
	export type WP_Settings =InferOutput<typeof SettingsSchema>;
	/**
	 * Get taxonomies
	 *
	 * @since 0.1.0
	 *
	 * @param url WordPress API root URL.
	 * @param context Request context, defaults to 'view'.
	 * @param auth Authorization header.
	 * @param args Request arguments.
	 *
	 * @return {Promise<v.InferOutput<v.ArraySchema<typeof TaxQuerySchemas[C], undefined>>>} Taxonomy collection.
	 */
	export function get_taxonomies<C extends keyof typeof TaxQuerySchemas>(url: string, context: C, auth?: string | undefined, args?: Fetch_Taxonomies_Args | undefined): Promise<InferOutput<ArraySchema<(typeof TaxQuerySchemas)[C], undefined>>>;
	/**
	 * Get single taxonomy
	 *
	 * @since 0.2.0
	 *
	 * @param name Taxonomy name.
	 * @param url WordPress API root URL.
	 * @param context Request context, defaults to 'view'.
	 * @param auth Authorization header.
	 *
	 * @return {Promise<v.InferOutput<TaxQuerySchemas[C]>>} Taxonomy collection.
	 */
	export function get_single_taxonomy<C extends keyof typeof TaxQuerySchemas>(name: string, url: string, context: C, auth?: string | undefined): Promise<InferOutput<{
		edit:ObjectSchema<{
			readonly name:StringSchema<undefined>;
			readonly description:StringSchema<undefined>;
			readonly slug:StringSchema<undefined>;
			readonly _links:ObjectSchema<{
				readonly collection:ArraySchema<ObjectSchema<{
					readonly embeddable:OptionalSchema<BooleanSchema<undefined>, undefined>;
					readonly href:SchemaWithPipe<readonly [StringSchema<undefined>,UrlAction<string, undefined>]>;
					readonly templated:OptionalSchema<BooleanSchema<undefined>, undefined>;
					readonly type:OptionalSchema<StringSchema<undefined>, undefined>;
				}, undefined>, undefined>;
				readonly 'wp:items':ArraySchema<ObjectSchema<{
					readonly embeddable:OptionalSchema<BooleanSchema<undefined>, undefined>;
					readonly href:SchemaWithPipe<readonly [StringSchema<undefined>,UrlAction<string, undefined>]>;
					readonly templated:OptionalSchema<BooleanSchema<undefined>, undefined>;
					readonly type:OptionalSchema<StringSchema<undefined>, undefined>;
				}, undefined>, undefined>;
			}, undefined>;
			readonly rest_base:StringSchema<undefined>;
			readonly rest_namespace:StringSchema<undefined>;
			readonly types:ArraySchema<StringSchema<undefined>, undefined>;
			readonly hierarchical:BooleanSchema<undefined>;
			readonly capabilities:RecordSchema<StringSchema<undefined>,StringSchema<undefined>, undefined>;
			readonly labels:ObjectSchema<{
				readonly add_new_item:StringSchema<undefined>;
				readonly add_or_remove_items:NullableSchema<StringSchema<undefined>, undefined>;
				readonly all_items:StringSchema<undefined>;
				readonly archives:OptionalSchema<StringSchema<undefined>, undefined>;
				readonly back_to_items:StringSchema<undefined>;
				readonly choose_from_most_used:NullableSchema<StringSchema<undefined>, undefined>;
				readonly desc_field_description:StringSchema<undefined>;
				readonly edit_item:StringSchema<undefined>;
				readonly filter_by_item:NullableSchema<StringSchema<undefined>, undefined>;
				readonly item_link_description:StringSchema<undefined>;
				readonly item_link:StringSchema<undefined>;
				readonly items_list_navigation:StringSchema<undefined>;
				readonly items_list:StringSchema<undefined>;
				readonly menu_name:StringSchema<undefined>;
				readonly most_used:StringSchema<undefined>;
				readonly name_admin_bar:StringSchema<undefined>;
				readonly name_field_description:StringSchema<undefined>;
				readonly name:StringSchema<undefined>;
				readonly new_item_name:StringSchema<undefined>;
				readonly no_terms:StringSchema<undefined>;
				readonly not_found:StringSchema<undefined>;
				readonly parent_field_description:NullableSchema<StringSchema<undefined>, undefined>;
				readonly parent_item_colon:NullableSchema<StringSchema<undefined>, undefined>;
				readonly parent_item:StringSchema<undefined>;
				readonly popular_items:NullableSchema<StringSchema<undefined>, undefined>;
				readonly search_items:StringSchema<undefined>;
				readonly separate_items_with_commas:NullableSchema<StringSchema<undefined>, undefined>;
				readonly singular_name:StringSchema<undefined>;
				readonly slug_field_description:StringSchema<undefined>;
				readonly update_item:StringSchema<undefined>;
				readonly view_item:StringSchema<undefined>;
			}, undefined>;
			readonly show_cloud:BooleanSchema<undefined>;
			readonly visibility:ObjectSchema<{
				readonly public:BooleanSchema<undefined>;
				readonly publicly_queryable:BooleanSchema<undefined>;
				readonly show_admin_column:BooleanSchema<undefined>;
				readonly show_in_nav_menus:BooleanSchema<undefined>;
				readonly show_in_quick_edit:BooleanSchema<undefined>;
				readonly show_ui:BooleanSchema<undefined>;
			}, undefined>;
		}, undefined>;
		embed:ObjectSchema<{
			readonly name:StringSchema<undefined>;
			readonly rest_base:StringSchema<undefined>;
			readonly rest_namespace:StringSchema<undefined>;
			readonly slug:StringSchema<undefined>;
			readonly _links:ObjectSchema<{
				readonly collection:ArraySchema<ObjectSchema<{
					readonly embeddable:OptionalSchema<BooleanSchema<undefined>, undefined>;
					readonly href:SchemaWithPipe<readonly [StringSchema<undefined>,UrlAction<string, undefined>]>;
					readonly templated:OptionalSchema<BooleanSchema<undefined>, undefined>;
					readonly type:OptionalSchema<StringSchema<undefined>, undefined>;
				}, undefined>, undefined>;
				readonly 'wp:items':ArraySchema<ObjectSchema<{
					readonly embeddable:OptionalSchema<BooleanSchema<undefined>, undefined>;
					readonly href:SchemaWithPipe<readonly [StringSchema<undefined>,UrlAction<string, undefined>]>;
					readonly templated:OptionalSchema<BooleanSchema<undefined>, undefined>;
					readonly type:OptionalSchema<StringSchema<undefined>, undefined>;
				}, undefined>, undefined>;
			}, undefined>;
		}, undefined>;
		view:ObjectSchema<{
			readonly name:StringSchema<undefined>;
			readonly slug:StringSchema<undefined>;
			readonly _links:ObjectSchema<{
				readonly collection:ArraySchema<ObjectSchema<{
					readonly embeddable:OptionalSchema<BooleanSchema<undefined>, undefined>;
					readonly href:SchemaWithPipe<readonly [StringSchema<undefined>,UrlAction<string, undefined>]>;
					readonly templated:OptionalSchema<BooleanSchema<undefined>, undefined>;
					readonly type:OptionalSchema<StringSchema<undefined>, undefined>;
				}, undefined>, undefined>;
				readonly 'wp:items':ArraySchema<ObjectSchema<{
					readonly embeddable:OptionalSchema<BooleanSchema<undefined>, undefined>;
					readonly href:SchemaWithPipe<readonly [StringSchema<undefined>,UrlAction<string, undefined>]>;
					readonly templated:OptionalSchema<BooleanSchema<undefined>, undefined>;
					readonly type:OptionalSchema<StringSchema<undefined>, undefined>;
				}, undefined>, undefined>;
			}, undefined>;
			readonly rest_base:StringSchema<undefined>;
			readonly rest_namespace:StringSchema<undefined>;
			readonly description:StringSchema<undefined>;
			readonly hierarchical:BooleanSchema<undefined>;
			readonly types:ArraySchema<StringSchema<undefined>, undefined>;
		}, undefined>;
	}[C]>>;

	export const TaxonomyEmbedSchema:ObjectSchema<{
		readonly name:StringSchema<undefined>;
		readonly rest_base:StringSchema<undefined>;
		readonly rest_namespace:StringSchema<undefined>;
		readonly slug:StringSchema<undefined>;
		readonly _links:ObjectSchema<{
			readonly collection:ArraySchema<ObjectSchema<{
				readonly embeddable:OptionalSchema<BooleanSchema<undefined>, undefined>;
				readonly href:SchemaWithPipe<readonly [StringSchema<undefined>,UrlAction<string, undefined>]>;
				readonly templated:OptionalSchema<BooleanSchema<undefined>, undefined>;
				readonly type:OptionalSchema<StringSchema<undefined>, undefined>;
			}, undefined>, undefined>;
			readonly 'wp:items':ArraySchema<ObjectSchema<{
				readonly embeddable:OptionalSchema<BooleanSchema<undefined>, undefined>;
				readonly href:SchemaWithPipe<readonly [StringSchema<undefined>,UrlAction<string, undefined>]>;
				readonly templated:OptionalSchema<BooleanSchema<undefined>, undefined>;
				readonly type:OptionalSchema<StringSchema<undefined>, undefined>;
			}, undefined>, undefined>;
		}, undefined>;
	}, undefined>;

	export const TaxonomyViewSchema:ObjectSchema<{
		readonly name:StringSchema<undefined>;
		readonly slug:StringSchema<undefined>;
		readonly _links:ObjectSchema<{
			readonly collection:ArraySchema<ObjectSchema<{
				readonly embeddable:OptionalSchema<BooleanSchema<undefined>, undefined>;
				readonly href:SchemaWithPipe<readonly [StringSchema<undefined>,UrlAction<string, undefined>]>;
				readonly templated:OptionalSchema<BooleanSchema<undefined>, undefined>;
				readonly type:OptionalSchema<StringSchema<undefined>, undefined>;
			}, undefined>, undefined>;
			readonly 'wp:items':ArraySchema<ObjectSchema<{
				readonly embeddable:OptionalSchema<BooleanSchema<undefined>, undefined>;
				readonly href:SchemaWithPipe<readonly [StringSchema<undefined>,UrlAction<string, undefined>]>;
				readonly templated:OptionalSchema<BooleanSchema<undefined>, undefined>;
				readonly type:OptionalSchema<StringSchema<undefined>, undefined>;
			}, undefined>, undefined>;
		}, undefined>;
		readonly rest_base:StringSchema<undefined>;
		readonly rest_namespace:StringSchema<undefined>;
		readonly description:StringSchema<undefined>;
		readonly hierarchical:BooleanSchema<undefined>;
		readonly types:ArraySchema<StringSchema<undefined>, undefined>;
	}, undefined>;

	export const TaxonomyEditSchema:ObjectSchema<{
		readonly name:StringSchema<undefined>;
		readonly description:StringSchema<undefined>;
		readonly slug:StringSchema<undefined>;
		readonly _links:ObjectSchema<{
			readonly collection:ArraySchema<ObjectSchema<{
				readonly embeddable:OptionalSchema<BooleanSchema<undefined>, undefined>;
				readonly href:SchemaWithPipe<readonly [StringSchema<undefined>,UrlAction<string, undefined>]>;
				readonly templated:OptionalSchema<BooleanSchema<undefined>, undefined>;
				readonly type:OptionalSchema<StringSchema<undefined>, undefined>;
			}, undefined>, undefined>;
			readonly 'wp:items':ArraySchema<ObjectSchema<{
				readonly embeddable:OptionalSchema<BooleanSchema<undefined>, undefined>;
				readonly href:SchemaWithPipe<readonly [StringSchema<undefined>,UrlAction<string, undefined>]>;
				readonly templated:OptionalSchema<BooleanSchema<undefined>, undefined>;
				readonly type:OptionalSchema<StringSchema<undefined>, undefined>;
			}, undefined>, undefined>;
		}, undefined>;
		readonly rest_base:StringSchema<undefined>;
		readonly rest_namespace:StringSchema<undefined>;
		readonly types:ArraySchema<StringSchema<undefined>, undefined>;
		readonly hierarchical:BooleanSchema<undefined>;
		readonly capabilities:RecordSchema<StringSchema<undefined>,StringSchema<undefined>, undefined>;
		readonly labels:ObjectSchema<{
			readonly add_new_item:StringSchema<undefined>;
			readonly add_or_remove_items:NullableSchema<StringSchema<undefined>, undefined>;
			readonly all_items:StringSchema<undefined>;
			readonly archives:OptionalSchema<StringSchema<undefined>, undefined>;
			readonly back_to_items:StringSchema<undefined>;
			readonly choose_from_most_used:NullableSchema<StringSchema<undefined>, undefined>;
			readonly desc_field_description:StringSchema<undefined>;
			readonly edit_item:StringSchema<undefined>;
			readonly filter_by_item:NullableSchema<StringSchema<undefined>, undefined>;
			readonly item_link_description:StringSchema<undefined>;
			readonly item_link:StringSchema<undefined>;
			readonly items_list_navigation:StringSchema<undefined>;
			readonly items_list:StringSchema<undefined>;
			readonly menu_name:StringSchema<undefined>;
			readonly most_used:StringSchema<undefined>;
			readonly name_admin_bar:StringSchema<undefined>;
			readonly name_field_description:StringSchema<undefined>;
			readonly name:StringSchema<undefined>;
			readonly new_item_name:StringSchema<undefined>;
			readonly no_terms:StringSchema<undefined>;
			readonly not_found:StringSchema<undefined>;
			readonly parent_field_description:NullableSchema<StringSchema<undefined>, undefined>;
			readonly parent_item_colon:NullableSchema<StringSchema<undefined>, undefined>;
			readonly parent_item:StringSchema<undefined>;
			readonly popular_items:NullableSchema<StringSchema<undefined>, undefined>;
			readonly search_items:StringSchema<undefined>;
			readonly separate_items_with_commas:NullableSchema<StringSchema<undefined>, undefined>;
			readonly singular_name:StringSchema<undefined>;
			readonly slug_field_description:StringSchema<undefined>;
			readonly update_item:StringSchema<undefined>;
			readonly view_item:StringSchema<undefined>;
		}, undefined>;
		readonly show_cloud:BooleanSchema<undefined>;
		readonly visibility:ObjectSchema<{
			readonly public:BooleanSchema<undefined>;
			readonly publicly_queryable:BooleanSchema<undefined>;
			readonly show_admin_column:BooleanSchema<undefined>;
			readonly show_in_nav_menus:BooleanSchema<undefined>;
			readonly show_in_quick_edit:BooleanSchema<undefined>;
			readonly show_ui:BooleanSchema<undefined>;
		}, undefined>;
	}, undefined>;
	export type WP_Taxonomy_Embed =InferOutput<typeof TaxonomyEmbedSchema>;
	export type WP_Taxonomy =InferOutput<typeof TaxonomyViewSchema>;
	export type WP_Taxonomy_Edit =InferOutput<typeof TaxonomyEditSchema>;
	namespace TaxQuerySchemas {
		export { TaxonomyEditSchema as edit };
		export { TaxonomyEmbedSchema as embed };
		export { TaxonomyViewSchema as view };
	}
	/**
	 * Get taxonomy terms
	 *
	 * @since 0.1.0
	 *
	 * @param url WordPress API root URL.
	 * @param taxonomy Taxonomy's rest_base.
	 * @param context Request context, defaults to 'view'.
	 * @param auth Authorization header.
	 * @param args Request arguments.
	 *
	 * @return {Promise<v.InferOutput<v.ArraySchema<typeof TermQuerySchemas[C], undefined>>>} Term collection.
	 */
	export function get_terms<C extends keyof typeof TermQuerySchemas>(url: string, taxonomy: string, context: C, auth?: string | undefined, args?: Fetch_Terms_Args | undefined): Promise<InferOutput<ArraySchema<(typeof TermQuerySchemas)[C], undefined>>>;

	export const TermEmbedSchema:ObjectSchema<{
		readonly id:SchemaWithPipe<readonly [NumberSchema<undefined>,MinValueAction<number, 1, undefined>]>;
		readonly link:StringSchema<undefined>;
		readonly name:StringSchema<undefined>;
		readonly slug:StringSchema<undefined>;
		readonly taxonomy:StringSchema<undefined>;
		readonly _links:ObjectSchema<{
			readonly about:ArraySchema<ObjectSchema<{
				readonly embeddable:OptionalSchema<BooleanSchema<undefined>, undefined>;
				readonly href:SchemaWithPipe<readonly [StringSchema<undefined>,UrlAction<string, undefined>]>;
				readonly templated:OptionalSchema<BooleanSchema<undefined>, undefined>;
				readonly type:OptionalSchema<StringSchema<undefined>, undefined>;
			}, undefined>, undefined>;
			readonly collection:ArraySchema<ObjectSchema<{
				readonly embeddable:OptionalSchema<BooleanSchema<undefined>, undefined>;
				readonly href:SchemaWithPipe<readonly [StringSchema<undefined>,UrlAction<string, undefined>]>;
				readonly templated:OptionalSchema<BooleanSchema<undefined>, undefined>;
				readonly type:OptionalSchema<StringSchema<undefined>, undefined>;
			}, undefined>, undefined>;
			readonly self:ArraySchema<ObjectSchema<{
				readonly embeddable:OptionalSchema<BooleanSchema<undefined>, undefined>;
				readonly href:SchemaWithPipe<readonly [StringSchema<undefined>,UrlAction<string, undefined>]>;
				readonly templated:OptionalSchema<BooleanSchema<undefined>, undefined>;
				readonly type:OptionalSchema<StringSchema<undefined>, undefined>;
			}, undefined>, undefined>;
			readonly 'wp:post_type':ArraySchema<ObjectSchema<{
				readonly embeddable:OptionalSchema<BooleanSchema<undefined>, undefined>;
				readonly href:SchemaWithPipe<readonly [StringSchema<undefined>,UrlAction<string, undefined>]>;
				readonly templated:OptionalSchema<BooleanSchema<undefined>, undefined>;
				readonly type:OptionalSchema<StringSchema<undefined>, undefined>;
			}, undefined>, undefined>;
		}, undefined>;
	}, undefined>;

	export const TermViewSchema:ObjectSchema<{
		readonly link:StringSchema<undefined>;
		readonly name:StringSchema<undefined>;
		readonly id:SchemaWithPipe<readonly [NumberSchema<undefined>,MinValueAction<number, 1, undefined>]>;
		readonly slug:StringSchema<undefined>;
		readonly _links:ObjectSchema<{
			readonly about:ArraySchema<ObjectSchema<{
				readonly embeddable:OptionalSchema<BooleanSchema<undefined>, undefined>;
				readonly href:SchemaWithPipe<readonly [StringSchema<undefined>,UrlAction<string, undefined>]>;
				readonly templated:OptionalSchema<BooleanSchema<undefined>, undefined>;
				readonly type:OptionalSchema<StringSchema<undefined>, undefined>;
			}, undefined>, undefined>;
			readonly collection:ArraySchema<ObjectSchema<{
				readonly embeddable:OptionalSchema<BooleanSchema<undefined>, undefined>;
				readonly href:SchemaWithPipe<readonly [StringSchema<undefined>,UrlAction<string, undefined>]>;
				readonly templated:OptionalSchema<BooleanSchema<undefined>, undefined>;
				readonly type:OptionalSchema<StringSchema<undefined>, undefined>;
			}, undefined>, undefined>;
			readonly self:ArraySchema<ObjectSchema<{
				readonly embeddable:OptionalSchema<BooleanSchema<undefined>, undefined>;
				readonly href:SchemaWithPipe<readonly [StringSchema<undefined>,UrlAction<string, undefined>]>;
				readonly templated:OptionalSchema<BooleanSchema<undefined>, undefined>;
				readonly type:OptionalSchema<StringSchema<undefined>, undefined>;
			}, undefined>, undefined>;
			readonly 'wp:post_type':ArraySchema<ObjectSchema<{
				readonly embeddable:OptionalSchema<BooleanSchema<undefined>, undefined>;
				readonly href:SchemaWithPipe<readonly [StringSchema<undefined>,UrlAction<string, undefined>]>;
				readonly templated:OptionalSchema<BooleanSchema<undefined>, undefined>;
				readonly type:OptionalSchema<StringSchema<undefined>, undefined>;
			}, undefined>, undefined>;
		}, undefined>;
		readonly taxonomy:StringSchema<undefined>;
		readonly meta:OptionalSchema<UnionSchema<[AnySchema,ArraySchema<NeverSchema<undefined>, undefined>], undefined>, undefined>;
		readonly count:NumberSchema<undefined>;
		readonly description:StringSchema<undefined>;
		readonly parent:NumberSchema<undefined>;
	}, undefined>;
	export type WP_Term_Embed =InferOutput<typeof TermEmbedSchema>;
	export type WP_Term =InferOutput<typeof TermViewSchema>;
	export type WP_Term_Edit =InferOutput<ObjectSchema<{
		readonly link:StringSchema<undefined>;
		readonly name:StringSchema<undefined>;
		readonly id:SchemaWithPipe<readonly [NumberSchema<undefined>,MinValueAction<number, 1, undefined>]>;
		readonly slug:StringSchema<undefined>;
		readonly _links:ObjectSchema<{
			readonly about:ArraySchema<ObjectSchema<{
				readonly embeddable:OptionalSchema<BooleanSchema<undefined>, undefined>;
				readonly href:SchemaWithPipe<readonly [StringSchema<undefined>,UrlAction<string, undefined>]>;
				readonly templated:OptionalSchema<BooleanSchema<undefined>, undefined>;
				readonly type:OptionalSchema<StringSchema<undefined>, undefined>;
			}, undefined>, undefined>;
			readonly collection:ArraySchema<ObjectSchema<{
				readonly embeddable:OptionalSchema<BooleanSchema<undefined>, undefined>;
				readonly href:SchemaWithPipe<readonly [StringSchema<undefined>,UrlAction<string, undefined>]>;
				readonly templated:OptionalSchema<BooleanSchema<undefined>, undefined>;
				readonly type:OptionalSchema<StringSchema<undefined>, undefined>;
			}, undefined>, undefined>;
			readonly self:ArraySchema<ObjectSchema<{
				readonly embeddable:OptionalSchema<BooleanSchema<undefined>, undefined>;
				readonly href:SchemaWithPipe<readonly [StringSchema<undefined>,UrlAction<string, undefined>]>;
				readonly templated:OptionalSchema<BooleanSchema<undefined>, undefined>;
				readonly type:OptionalSchema<StringSchema<undefined>, undefined>;
			}, undefined>, undefined>;
			readonly 'wp:post_type':ArraySchema<ObjectSchema<{
				readonly embeddable:OptionalSchema<BooleanSchema<undefined>, undefined>;
				readonly href:SchemaWithPipe<readonly [StringSchema<undefined>,UrlAction<string, undefined>]>;
				readonly templated:OptionalSchema<BooleanSchema<undefined>, undefined>;
				readonly type:OptionalSchema<StringSchema<undefined>, undefined>;
			}, undefined>, undefined>;
		}, undefined>;
		readonly taxonomy:StringSchema<undefined>;
		readonly meta:OptionalSchema<UnionSchema<[AnySchema,ArraySchema<NeverSchema<undefined>, undefined>], undefined>, undefined>;
		readonly count:NumberSchema<undefined>;
		readonly description:StringSchema<undefined>;
		readonly parent:NumberSchema<undefined>;
	}, undefined>>;
	namespace TermQuerySchemas {
		export { TermViewSchema as edit };
		export { TermEmbedSchema as embed };
		export { TermViewSchema as view };
	}
	/**
	 * Get user data
	 *
	 * @since 0.1.0
	 *
	 * @param id User ID or 'me'.
	 * @param url WordPress API root URL.
	 * @param context Request context, defaults to 'view'.
	 * @param auth Authorization header (required when `id` is `me`).
	 *
	 * @return {Promise<v.InferOutput<typeof UserQuerySchemas[C]>>} User data.
	 */
	export function get_single_user<C extends keyof typeof UserQuerySchemas>(id: User_ID_Arg, url: string, context: C, auth?: string): Promise<InferOutput<(typeof UserQuerySchemas)[C]>>;
	/**
	 * Get users
	 *
	 * @since 0.1.0
	 *
	 * @param url WordPress API root URL.
	 * @param context Request context.
	 * @param auth Authorization header.
	 * @param args Request arguments.
	 *
	 * @return {Promise<v.InferOutput<v.ArraySchema<typeof UserQuerySchemas[C], undefined>>>} User collection.
	 */
	export function get_users<C extends keyof typeof UserQuerySchemas>(url: string, context: C, auth?: string, args?: Fetch_Users_Args): Promise<InferOutput<ArraySchema<(typeof UserQuerySchemas)[C], undefined>>>;

	export const UserEmbedSchema:ObjectSchema<{
		readonly avatar_urls:RecordSchema<StringSchema<undefined>,SchemaWithPipe<readonly [StringSchema<undefined>,UrlAction<string, undefined>]>, undefined>;
		readonly description:StringSchema<undefined>;
		readonly id:SchemaWithPipe<readonly [NumberSchema<undefined>,MinValueAction<number, 1, undefined>]>;
		readonly name:SchemaWithPipe<readonly [StringSchema<undefined>,MinLengthAction<string, 1, undefined>]>;
		readonly url:SchemaWithPipe<readonly [StringSchema<undefined>,UrlAction<string, undefined>]>;
		readonly slug:StringSchema<undefined>;
		readonly _links:ObjectSchema<{
			readonly self:ArraySchema<ObjectSchema<{
				readonly embeddable:OptionalSchema<BooleanSchema<undefined>, undefined>;
				readonly href:SchemaWithPipe<readonly [StringSchema<undefined>,UrlAction<string, undefined>]>;
				readonly templated:OptionalSchema<BooleanSchema<undefined>, undefined>;
				readonly type:OptionalSchema<StringSchema<undefined>, undefined>;
			}, undefined>, undefined>;
			readonly collection:ArraySchema<ObjectSchema<{
				readonly embeddable:OptionalSchema<BooleanSchema<undefined>, undefined>;
				readonly href:SchemaWithPipe<readonly [StringSchema<undefined>,UrlAction<string, undefined>]>;
				readonly templated:OptionalSchema<BooleanSchema<undefined>, undefined>;
				readonly type:OptionalSchema<StringSchema<undefined>, undefined>;
			}, undefined>, undefined>;
		}, undefined>;
	}, undefined>;

	export const UserViewSchema:ObjectSchema<{
		readonly name:SchemaWithPipe<readonly [StringSchema<undefined>,MinLengthAction<string, 1, undefined>]>;
		readonly id:SchemaWithPipe<readonly [NumberSchema<undefined>,MinValueAction<number, 1, undefined>]>;
		readonly url:SchemaWithPipe<readonly [StringSchema<undefined>,UrlAction<string, undefined>]>;
		readonly description:StringSchema<undefined>;
		readonly slug:StringSchema<undefined>;
		readonly _links:ObjectSchema<{
			readonly self:ArraySchema<ObjectSchema<{
				readonly embeddable:OptionalSchema<BooleanSchema<undefined>, undefined>;
				readonly href:SchemaWithPipe<readonly [StringSchema<undefined>,UrlAction<string, undefined>]>;
				readonly templated:OptionalSchema<BooleanSchema<undefined>, undefined>;
				readonly type:OptionalSchema<StringSchema<undefined>, undefined>;
			}, undefined>, undefined>;
			readonly collection:ArraySchema<ObjectSchema<{
				readonly embeddable:OptionalSchema<BooleanSchema<undefined>, undefined>;
				readonly href:SchemaWithPipe<readonly [StringSchema<undefined>,UrlAction<string, undefined>]>;
				readonly templated:OptionalSchema<BooleanSchema<undefined>, undefined>;
				readonly type:OptionalSchema<StringSchema<undefined>, undefined>;
			}, undefined>, undefined>;
		}, undefined>;
		readonly avatar_urls:RecordSchema<StringSchema<undefined>,SchemaWithPipe<readonly [StringSchema<undefined>,UrlAction<string, undefined>]>, undefined>;
		readonly meta:OptionalSchema<UnionSchema<[AnySchema,ArraySchema<NeverSchema<undefined>, undefined>], undefined>, undefined>;
	}, undefined>;

	export const UserEditSchema:ObjectSchema<{
		readonly name:SchemaWithPipe<readonly [StringSchema<undefined>,MinLengthAction<string, 1, undefined>]>;
		readonly id:SchemaWithPipe<readonly [NumberSchema<undefined>,MinValueAction<number, 1, undefined>]>;
		readonly url:SchemaWithPipe<readonly [StringSchema<undefined>,UrlAction<string, undefined>]>;
		readonly meta:OptionalSchema<UnionSchema<[AnySchema,ArraySchema<NeverSchema<undefined>, undefined>], undefined>, undefined>;
		readonly description:StringSchema<undefined>;
		readonly slug:StringSchema<undefined>;
		readonly _links:ObjectSchema<{
			readonly self:ArraySchema<ObjectSchema<{
				readonly embeddable:OptionalSchema<BooleanSchema<undefined>, undefined>;
				readonly href:SchemaWithPipe<readonly [StringSchema<undefined>,UrlAction<string, undefined>]>;
				readonly templated:OptionalSchema<BooleanSchema<undefined>, undefined>;
				readonly type:OptionalSchema<StringSchema<undefined>, undefined>;
			}, undefined>, undefined>;
			readonly collection:ArraySchema<ObjectSchema<{
				readonly embeddable:OptionalSchema<BooleanSchema<undefined>, undefined>;
				readonly href:SchemaWithPipe<readonly [StringSchema<undefined>,UrlAction<string, undefined>]>;
				readonly templated:OptionalSchema<BooleanSchema<undefined>, undefined>;
				readonly type:OptionalSchema<StringSchema<undefined>, undefined>;
			}, undefined>, undefined>;
		}, undefined>;
		readonly avatar_urls:RecordSchema<StringSchema<undefined>,SchemaWithPipe<readonly [StringSchema<undefined>,UrlAction<string, undefined>]>, undefined>;
		readonly capabilities:RecordSchema<StringSchema<undefined>,BooleanSchema<undefined>, undefined>;
		readonly email:SchemaWithPipe<readonly [StringSchema<undefined>,EmailAction<string, undefined>]>;
		readonly extra_capabilities:RecordSchema<StringSchema<undefined>,BooleanSchema<undefined>, undefined>;
		readonly first_name:StringSchema<undefined>;
		readonly last_name:StringSchema<undefined>;
		readonly link:SchemaWithPipe<readonly [StringSchema<undefined>,UrlAction<string, undefined>]>;
		readonly locale:StringSchema<undefined>;
		readonly nickname:StringSchema<undefined>;
		readonly registered_date:RecordSchema<StringSchema<undefined>,BooleanSchema<undefined>, undefined>;
		readonly roles:ArraySchema<StringSchema<undefined>, undefined>;
		readonly username:StringSchema<undefined>;
	}, undefined>;
	export type WP_User_Embed =InferOutput<typeof UserEmbedSchema>;
	export type WP_User =InferOutput<typeof UserViewSchema>;
	export type WP_User_Edit =InferOutput<typeof UserEditSchema>;
	namespace UserQuerySchemas {
		export { UserEditSchema as edit };
		export { UserEmbedSchema as embed };
		export { UserViewSchema as view };
	}
	type Context_Arg = 'edit' | 'embed' | 'view';
	type Operator_Arg = 'AND' | 'OR';
	type Order_Arg = 'asc' | 'desc';
	type User_ID_Arg = number | 'me';
	interface Tax_Query {
		include_children?: boolean;
		operator?: Operator_Arg;
		terms: number[];
	}
	interface Fetch_Args {
		/**
		 * Scope under which the request is made; determines fields present in response.
		 *
		 * @default 'view'
		 */
		context?: Context_Arg;
	}
	interface Fetch_Collection_Args {
		/**
		 * "Current page of the collection."
		 *
		 * @default 1
		 */
		page?: number;
		/**
		 * Maximum number of items to be returned in result set (maximum 100).
		 *
		 * @default 10
		 */
		per_page?: number;
		/**
		 * Limit results to those matching a string.
		 */
		search?: string;
		/**
		 * Ensure result set excludes specific IDs.
		 */
		exclude?: number[];
		/**
		 * Limit result set to specific IDs.
		 */
		include?: number[];
		/**
		 * Order sort attribute ascending or descending.
		 */
		order?: Order_Arg;
	}
	interface Fetch_Posts_Args extends Fetch_Collection_Args {
		/**
		 * Limit response to posts published after a given ISO8601 compliant date.
		 */
		after?: string;
		/**
		 * Limit result set to posts assigned to specific authors.
		 */
		author?: number[];
		/**
		 * Ensure result set excludes posts assigned to specific authors.
		 */
		author_exclude?: number[];
		/**
		 * Limit response to posts published before a given ISO8601 compliant date.
		 */
		before?: string;
		/**
		 * Limit result set to items with specific terms assigned in the categories taxonomy.
		 */
		categories?: number[] | Tax_Query[];
		/**
		 * Limit result set to items except those with specific terms assigned in the categories taxonomy.
		 */
		categories_exclude?: number[] | Tax_Query[];
		/**
		 * Limit response to posts modified after a given ISO8601 compliant date.
		 */
		modified_after?: string;
		/**
		 * Limit response to posts modified before a given ISO8601 compliant date.
		 */
		modified_before?: string;
		/**
		 * Offset the result set by a specific number of items.
		 */
		offset?: number;
		/**
		 * Sort collection by post attribute.
		 */
		orderby?: 'author' | 'date' | 'id' | 'include' | 'modified' | 'parent' | 'relevance' | 'slug' | 'include_slugs' | 'title';
		/**
		 * Array of column names to be searched.
		 */
		search_columns?: ('post_title' | 'post_content' | 'post_excerpt')[];
		/**
		 * Limit result set to terms with one or more specific slugs.
		 */
		slug?: string[];
		/**
		 * Limit result set to posts assigned one or more statuses.
		 *
		 * @default 'publish'
		 */
		status?: string;
		/**
		 * Limit result set based on relationship between multiple taxonomies.
		 */
		tax_relation?: Operator_Arg;
		/**
		 * Limit result set to items with specific terms assigned in the categories taxonomy.
		 */
		tags?: number[] | Tax_Query[];
		/**
		 * Limit result set to items except those with specific terms assigned in the categories taxonomy.
		 */
		tags_exclude?: number[] | Tax_Query[];
		/**
		 * Limit result set to items that are sticky.
		 *
		 * @default false
		 */
		sticky?: boolean;
	}
	interface Fetch_Media_Args extends Fetch_Posts_Args {
		/**
		 * Limit result set to attachments of a particular media type.
		 */
		media_type?: 'application' | 'audio' | 'image' | 'text' | 'video';
		/**
		 * Limit result set to attachments of a particular MIME type.
		 */
		mime_type?: string;
		/**
		 * Limit result set to items with particular parent IDs.
		 */
		parent?: number[];
		/**
		 * Limit result set to all items except those of a particular parent ID.
		 */
		parent_exclude?: number[];
	}
	interface Fetch_Taxonomies_Args extends Fetch_Args {
		/**
		 * Limit results to taxonomies associated with a specific post type.
		 */
		type?: string;
	}
	interface Fetch_Terms_Args extends Fetch_Args, Fetch_Collection_Args {
		/**
		 * Whether to hide terms not assigned to any posts.
		 *
		 * @default false
		 */
		hide_empty?: boolean;
		/**
		 * Sort collection by term attribute.
		 *
		 * @default 'name'
		 */
		orderby?: 'id' | 'include' | 'name' | 'slug' | 'include_slugs' | 'term_group' | 'description' | 'count';
		/**
		 * Limit result set to terms assigned to a specific post.
		 */
		post?: number;
		/**
		 * Limit result set to terms with one or more specific slugs.
		 */
		slug?: string[];
	}
	interface Fetch_Users_Args extends Fetch_Args, Fetch_Collection_Args {
		/**
		 * Limit result set to users matching at least one specific capability provided. Accepts csv list or single capability.
		 */
		capabilities?: string[];
		/**
		 * Limit result set to users who have published posts.
		 */
		has_published_posts?: boolean | string[];
		/**
		 * Limit result set to users matching at least one specific role provided. Accepts csv list or single role.
		 */
		roles?: string[];
		/**
		 * Limit result set to terms with one or more specific slugs.
		 */
		slug?: string[];
		/**
		 * Limit result set to users who are considered authors.
		 */
		who?: 'authors';
	}

	export {};
}

declare module '@kucrut/wp-api-helpers/utils' {
	import * as v from 'valibot';
	/**
	 * Create basic auth string
	 *
	 * @since 0.3.0
	 *
	 * @param username User name.
	 * @param password User password.
	 * @return {string} Base64-encoded basic auth;
	 */
	export function create_basic_auth_string(username: string, password: string): string;
	/**
	 * Fetch and parse response
	 *
	 * @since 0.1.0
	 *
	 * @param schema Valibot schema to parse the response with.
	 * @param fetcher Fetch function.
	 *
	 * @return {ReturnType<import('../../types.ts').Handle_Response<v.InferOutput<T>>>} Parsed data.
	 */
	export function fetch_and_parse<T extendsGenericSchema>(schema: T, fetcher: () => ReturnType<typeof fetch>): ReturnType<Handle_Response<InferOutput<T>>>;
	/**
	 * Fetch data
	 *
	 * @since 0.1.0
	 *
	 * @param endpoint Data endpoint.
	 * @param auth Authentication header.
	 * @param args Arguments.
	 *
	 * @return {ReturnType<typeof fetch>} Response.
	 */
	export function fetch_data<A extends Record<string, unknown>>(endpoint: string | URL, auth?: string | undefined, args?: A | undefined): ReturnType<typeof fetch>;
	/**
	 * Generate endpoint URL
	 *
	 * @since 0.3.0
	 *
	 * @param base Base endpoint URL.
	 * @param context Request context, defaults to 'view'.
	 * @param suffix Endpoint suffix.
	 *
	 * @return {URL} URL object
	 */
	export function generate_endpoint_url(base: string, context?: Context_Arg | undefined, suffix?: string | number | undefined): URL;
	/**
	 * Get error message
	 *
	 * @since 0.1.0
	 *
	 * @param error Error object, whatever.
	 * @param fallback Fallback message if the error is unrecognized.
	 * @param dump Whether to dump error if the error is unrecognized. (Defaults to true).
	 *
	 * @return {string} Error message.
	 */
	export function get_error_message(error: unknown, fallback: string, dump?: boolean | undefined): string;
	/**
	 * Handle WP REST API response
	 *
	 * This helps catch syntax errors in json because of PHP notices, etc.
	 *
	 * @since 0.1.0
	 *
	 * @param response Fetch response object.
	 * @param callback Callback to run when json is valid.
	 *
	 * @throws {Error|v.ValiError|WP_REST_Error} JSON.parse error, Valibot error or WP API error.
	 *
	 * @return {Promise<T>} Whatever the callback returns.
	 */
	export function handle_response<T>(response: Response, callback: Handle_Response<T>): Promise<T>;
	/**
	 * Make response handler
	 *
	 * @since 0.1.0
	 *
	 * @param handler Handler function.
	 * @return {(resp: Response) => Promise<T>} Response handler function.
	 */
	export function make_response_handler<T>(handler: Handle_Response<T>): (resp: Response) => Promise<T>;
	/**
	 * Normalize fetch arguments
	 *
	 * @since 0.1.0
	 *
	 * @param args Fetch arguments.
	 * @return {[string, string][]} Pairs of key and value strings.
	 */
	export function normalize_fetch_args(args: Record<string, unknown>): [string, string][];
	export class WP_REST_Error extends Error {
		/**
		 * @param message Error message.
		 * @param code REST error code.
		 * @param data Misc. data.
		 */
		constructor(message: string, code: string, data: {
			status: number;
		});
		code: string;
		data: {
			status: number;
		};
	}
	type Context_Arg = 'edit' | 'embed' | 'view';
	type Handle_Response<T> = (data: unknown) => Promise<T>;
	/**
	 * Get fetch function
	 *
	 * @return {typeof fetch} Fetch function.
	 */
	export function get_fetch(): typeof fetch;
	/**
	 * Set fetcher
	 *
	 * @param fn Fetch function.
	 */
	export function set_fetch(fn: typeof fetch): void;

	export {};
}

//# sourceMappingURL=index.d.ts.map