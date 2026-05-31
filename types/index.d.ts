declare module '@kucrut/wp-api-helpers' {
	import type { ArraySchema, InferOutput } from 'valibot';
	/**
	 * Get application password authorization endpoint
	 *
	 * @since 0.3.0
	 *
	 * @param url WP API root URL.
	 *
	 * @return {Promise<string>} Application password authorization route.
	 */
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
	 * @return {Promise<InferOutput<ArraySchema<typeof AppPassQuerySchemas[C], undefined>>>} Application password collection.
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
	 * @param puuid Application password UUID.
	 *
	 * @return {Promise<WP_Application_Password_Deleted>} Response data.
	 */
	export function delete_app_password(url: string, auth: string, user_id: User_ID_Arg, puuid: string): Promise<WP_Application_Password_Deleted>;

	export const embed: import("valibot").ObjectSchema<{
		readonly app_id: import("valibot").StringSchema<undefined>;
		readonly name: import("valibot").StringSchema<undefined>;
		readonly uuid: import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").UuidAction<string, undefined>]>;
	}, undefined>;

	export const view: import("valibot").ObjectSchema<{
		readonly name: import("valibot").StringSchema<undefined>;
		readonly uuid: import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").UuidAction<string, undefined>]>;
		readonly app_id: import("valibot").StringSchema<undefined>;
		readonly created: import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").ToDateAction<string, undefined>]>;
		readonly last_ip: import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").IpAction<string, undefined>]>;
		readonly last_used: import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").ToDateAction<string, undefined>]>;
	}, undefined>;

	export const ApplicationPasswordDeletedSchema: import("valibot").ObjectSchema<{
		readonly deleted: import("valibot").BooleanSchema<undefined>;
		readonly previous: import("valibot").ObjectSchema<{
			readonly name: import("valibot").StringSchema<undefined>;
			readonly uuid: import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").UuidAction<string, undefined>]>;
			readonly app_id: import("valibot").StringSchema<undefined>;
			readonly created: import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").ToDateAction<string, undefined>]>;
			readonly last_ip: import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").IpAction<string, undefined>]>;
			readonly last_used: import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").ToDateAction<string, undefined>]>;
		}, undefined>;
	}, undefined>;
	export type WP_Application_Password_Embed = InferOutput<typeof embed>;
	export type WP_Application_Password = InferOutput<typeof view>;
	export type WP_Application_Password_Deleted = InferOutput<typeof ApplicationPasswordDeletedSchema>;
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

	export const InfoSchema: import("valibot").ObjectSchema<{
		readonly description: import("valibot").StringSchema<undefined>;
		readonly gmt_offset: import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").ToNumberAction<string, undefined>]>;
		readonly home: import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").UrlAction<string, undefined>]>;
		readonly name: import("valibot").StringSchema<undefined>;
		readonly namespaces: import("valibot").ArraySchema<import("valibot").StringSchema<undefined>, undefined>;
		readonly site_icon_url: import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").UrlAction<string, undefined>]>;
		readonly site_icon: import("valibot").NumberSchema<undefined>;
		readonly site_logo: import("valibot").NumberSchema<undefined>;
		readonly timezone_string: import("valibot").StringSchema<undefined>;
		readonly url: import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").UrlAction<string, undefined>]>;
		readonly authentication: import("valibot").RecordSchema<import("valibot").StringSchema<undefined>, import("valibot").ObjectSchema<{
			readonly endpoints: import("valibot").ObjectSchema<{
				readonly authorization: import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").UrlAction<string, undefined>]>;
			}, undefined>;
		}, undefined>, undefined>;
		readonly _links: import("valibot").RecordSchema<import("valibot").StringSchema<undefined>, import("valibot").ArraySchema<import("valibot").ObjectSchema<{
			readonly embeddable: import("valibot").OptionalSchema<import("valibot").BooleanSchema<undefined>, undefined>;
			readonly href: import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").UrlAction<string, undefined>]>;
			readonly templated: import("valibot").OptionalSchema<import("valibot").BooleanSchema<undefined>, undefined>;
			readonly type: import("valibot").OptionalSchema<import("valibot").StringSchema<undefined>, undefined>;
		}, undefined>, undefined>, undefined>;
	}, undefined>;
	export type WP_Info = InferOutput<typeof InfoSchema>;
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

	export const JwtAuthDataSchema: import("valibot").ObjectSchema<{
		readonly user_email: import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").EmailAction<string, undefined>]>;
		readonly user_display_name: import("valibot").StringSchema<undefined>;
		readonly user_nicename: import("valibot").StringSchema<undefined>;
		readonly token: import("valibot").StringSchema<undefined>;
	}, undefined>;

	export const JwtValidTokenSchema: import("valibot").ObjectSchema<{
		readonly code: import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").CheckAction<string, undefined>]>;
		readonly data: import("valibot").ObjectSchema<{
			readonly status: import("valibot").SchemaWithPipe<readonly [import("valibot").NumberSchema<undefined>, import("valibot").CheckAction<number, undefined>]>;
		}, undefined>;
	}, undefined>;
	export type JWT_Auth = InferOutput<typeof JwtAuthDataSchema>;
	export type JWT_Valid_Token = InferOutput<typeof JwtValidTokenSchema>;
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
	 * @return {Promise<InferOutput<ArraySchema<typeof MediaQuerySchemas[C], undefined>>>} Media collection.
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
	 * @return {Promise<InferOutput<typeof MediaQuerySchemas[C]>>} Single media data.
	 */
	export function get_single_media<C extends keyof typeof MediaQuerySchemas>(id: number, url: string, context: C, auth?: string | undefined): Promise<InferOutput<(typeof MediaQuerySchemas)[C]>>;

	export const ImageSizeSchema: import("valibot").ObjectSchema<{
		readonly file: import("valibot").StringSchema<undefined>;
		readonly height: import("valibot").NumberSchema<undefined>;
		readonly mime_type: import("valibot").StringSchema<undefined>;
		readonly source_url: import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").UrlAction<string, undefined>]>;
		readonly width: import("valibot").NumberSchema<undefined>;
	}, undefined>;

	export const MediaEmbedSchema: import("valibot").ObjectSchema<{
		readonly link: import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").UrlAction<string, undefined>]>;
		readonly type: import("valibot").StringSchema<undefined>;
		readonly id: import("valibot").NumberSchema<undefined>;
		readonly title: import("valibot").ObjectSchema<{
			readonly block_version: import("valibot").OptionalSchema<import("valibot").NumberSchema<undefined>, undefined>;
			readonly protected: import("valibot").OptionalSchema<import("valibot").BooleanSchema<undefined>, undefined>;
			readonly raw: import("valibot").OptionalSchema<import("valibot").StringSchema<undefined>, undefined>;
			readonly rendered: import("valibot").StringSchema<undefined>;
		}, undefined>;
		readonly date: import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").ToDateAction<string, undefined>]>;
		readonly slug: import("valibot").StringSchema<undefined>;
		readonly author: import("valibot").SchemaWithPipe<readonly [import("valibot").NumberSchema<undefined>, import("valibot").MinValueAction<number, 1, undefined>]>;
		readonly _links: import("valibot").OptionalSchema<import("valibot").RecordSchema<import("valibot").StringSchema<undefined>, ArraySchema<import("valibot").ObjectSchema<{
			readonly embeddable: import("valibot").OptionalSchema<import("valibot").BooleanSchema<undefined>, undefined>;
			readonly href: import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").UrlAction<string, undefined>]>;
			readonly templated: import("valibot").OptionalSchema<import("valibot").BooleanSchema<undefined>, undefined>;
			readonly type: import("valibot").OptionalSchema<import("valibot").StringSchema<undefined>, undefined>;
		}, undefined>, undefined>, undefined>, undefined>;
		readonly alt_text: import("valibot").StringSchema<undefined>;
		readonly caption: import("valibot").ObjectSchema<{
			readonly block_version: import("valibot").OptionalSchema<import("valibot").NumberSchema<undefined>, undefined>;
			readonly protected: import("valibot").OptionalSchema<import("valibot").BooleanSchema<undefined>, undefined>;
			readonly raw: import("valibot").OptionalSchema<import("valibot").StringSchema<undefined>, undefined>;
			readonly rendered: import("valibot").StringSchema<undefined>;
		}, undefined>;
		readonly media_type: import("valibot").StringSchema<undefined>;
		readonly media_details: import("valibot").ObjectSchema<{
			readonly bitrate: import("valibot").OptionalSchema<import("valibot").NumberSchema<undefined>, undefined>;
			readonly dataformat: import("valibot").OptionalSchema<import("valibot").StringSchema<undefined>, undefined>;
			readonly file: import("valibot").OptionalSchema<import("valibot").StringSchema<undefined>, undefined>;
			readonly fileformat: import("valibot").OptionalSchema<import("valibot").StringSchema<undefined>, undefined>;
			readonly filesize: import("valibot").NumberSchema<undefined>;
			readonly height: import("valibot").OptionalSchema<import("valibot").NumberSchema<undefined>, undefined>;
			readonly image_meta: import("valibot").OptionalSchema<import("valibot").RecordSchema<import("valibot").StringSchema<undefined>, import("valibot").AnySchema, undefined>, undefined>;
			readonly length: import("valibot").OptionalSchema<import("valibot").NumberSchema<undefined>, undefined>;
			readonly length_formatted: import("valibot").OptionalSchema<import("valibot").StringSchema<undefined>, undefined>;
			readonly width: import("valibot").OptionalSchema<import("valibot").NumberSchema<undefined>, undefined>;
			readonly sizes: import("valibot").OptionalSchema<import("valibot").RecordSchema<import("valibot").StringSchema<undefined>, import("valibot").ObjectSchema<{
				readonly file: import("valibot").StringSchema<undefined>;
				readonly height: import("valibot").NumberSchema<undefined>;
				readonly mime_type: import("valibot").StringSchema<undefined>;
				readonly source_url: import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").UrlAction<string, undefined>]>;
				readonly width: import("valibot").NumberSchema<undefined>;
			}, undefined>, undefined>, undefined>;
		}, undefined>;
		readonly mime_type: import("valibot").StringSchema<undefined>;
		readonly source_url: import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").UrlAction<string, undefined>]>;
	}, undefined>;

	export const MediaViewSchema: import("valibot").ObjectSchema<{
		readonly caption: import("valibot").ObjectSchema<{
			readonly block_version: import("valibot").OptionalSchema<import("valibot").NumberSchema<undefined>, undefined>;
			readonly protected: import("valibot").OptionalSchema<import("valibot").BooleanSchema<undefined>, undefined>;
			readonly raw: import("valibot").OptionalSchema<import("valibot").StringSchema<undefined>, undefined>;
			readonly rendered: import("valibot").StringSchema<undefined>;
		}, undefined>;
		readonly mime_type: import("valibot").StringSchema<undefined>;
		readonly media_type: import("valibot").StringSchema<undefined>;
		readonly source_url: import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").UrlAction<string, undefined>]>;
		readonly media_details: import("valibot").ObjectSchema<{
			readonly bitrate: import("valibot").OptionalSchema<import("valibot").NumberSchema<undefined>, undefined>;
			readonly dataformat: import("valibot").OptionalSchema<import("valibot").StringSchema<undefined>, undefined>;
			readonly file: import("valibot").OptionalSchema<import("valibot").StringSchema<undefined>, undefined>;
			readonly fileformat: import("valibot").OptionalSchema<import("valibot").StringSchema<undefined>, undefined>;
			readonly filesize: import("valibot").NumberSchema<undefined>;
			readonly height: import("valibot").OptionalSchema<import("valibot").NumberSchema<undefined>, undefined>;
			readonly image_meta: import("valibot").OptionalSchema<import("valibot").RecordSchema<import("valibot").StringSchema<undefined>, import("valibot").AnySchema, undefined>, undefined>;
			readonly length: import("valibot").OptionalSchema<import("valibot").NumberSchema<undefined>, undefined>;
			readonly length_formatted: import("valibot").OptionalSchema<import("valibot").StringSchema<undefined>, undefined>;
			readonly width: import("valibot").OptionalSchema<import("valibot").NumberSchema<undefined>, undefined>;
			readonly sizes: import("valibot").OptionalSchema<import("valibot").RecordSchema<import("valibot").StringSchema<undefined>, import("valibot").ObjectSchema<{
				readonly file: import("valibot").StringSchema<undefined>;
				readonly height: import("valibot").NumberSchema<undefined>;
				readonly mime_type: import("valibot").StringSchema<undefined>;
				readonly source_url: import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").UrlAction<string, undefined>]>;
				readonly width: import("valibot").NumberSchema<undefined>;
			}, undefined>, undefined>, undefined>;
		}, undefined>;
		readonly alt_text: import("valibot").StringSchema<undefined>;
		readonly description: import("valibot").ObjectSchema<{
			readonly block_version: import("valibot").OptionalSchema<import("valibot").NumberSchema<undefined>, undefined>;
			readonly protected: import("valibot").OptionalSchema<import("valibot").BooleanSchema<undefined>, undefined>;
			readonly raw: import("valibot").OptionalSchema<import("valibot").StringSchema<undefined>, undefined>;
			readonly rendered: import("valibot").StringSchema<undefined>;
		}, undefined>;
		readonly post: import("valibot").NullableSchema<import("valibot").NumberSchema<undefined>, undefined>;
		readonly link: import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").UrlAction<string, undefined>]>;
		readonly type: import("valibot").StringSchema<undefined>;
		readonly format: import("valibot").OptionalSchema<import("valibot").StringSchema<undefined>, undefined>;
		readonly id: import("valibot").NumberSchema<undefined>;
		readonly meta: import("valibot").OptionalSchema<import("valibot").UnionSchema<[import("valibot").AnySchema, ArraySchema<import("valibot").NeverSchema<undefined>, undefined>], undefined>, undefined>;
		readonly template: import("valibot").StringSchema<undefined>;
		readonly title: import("valibot").ObjectSchema<{
			readonly block_version: import("valibot").OptionalSchema<import("valibot").NumberSchema<undefined>, undefined>;
			readonly protected: import("valibot").OptionalSchema<import("valibot").BooleanSchema<undefined>, undefined>;
			readonly raw: import("valibot").OptionalSchema<import("valibot").StringSchema<undefined>, undefined>;
			readonly rendered: import("valibot").StringSchema<undefined>;
		}, undefined>;
		readonly status: import("valibot").StringSchema<undefined>;
		readonly date: import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").ToDateAction<string, undefined>]>;
		readonly slug: import("valibot").StringSchema<undefined>;
		readonly author: import("valibot").SchemaWithPipe<readonly [import("valibot").NumberSchema<undefined>, import("valibot").MinValueAction<number, 1, undefined>]>;
		readonly modified: import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").ToDateAction<string, undefined>]>;
		readonly _links: import("valibot").OptionalSchema<import("valibot").RecordSchema<import("valibot").StringSchema<undefined>, ArraySchema<import("valibot").ObjectSchema<{
			readonly embeddable: import("valibot").OptionalSchema<import("valibot").BooleanSchema<undefined>, undefined>;
			readonly href: import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").UrlAction<string, undefined>]>;
			readonly templated: import("valibot").OptionalSchema<import("valibot").BooleanSchema<undefined>, undefined>;
			readonly type: import("valibot").OptionalSchema<import("valibot").StringSchema<undefined>, undefined>;
		}, undefined>, undefined>, undefined>, undefined>;
		readonly guid: import("valibot").ObjectSchema<{
			readonly raw: import("valibot").OptionalSchema<import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").UrlAction<string, undefined>]>, undefined>;
			readonly rendered: import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").UrlAction<string, undefined>]>;
		}, undefined>;
		readonly comment_status: import("valibot").PicklistSchema<["open", "closed"], undefined>;
		readonly date_gmt: import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").ToDateAction<string, undefined>]>;
		readonly modified_gmt: import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").ToDateAction<string, undefined>]>;
		readonly ping_status: import("valibot").PicklistSchema<["open", "closed"], undefined>;
	}, undefined>;

	export const MediaEditSchema: import("valibot").ObjectSchema<{
		readonly link: import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").UrlAction<string, undefined>]>;
		readonly type: import("valibot").StringSchema<undefined>;
		readonly format: import("valibot").OptionalSchema<import("valibot").StringSchema<undefined>, undefined>;
		readonly id: import("valibot").NumberSchema<undefined>;
		readonly caption: import("valibot").ObjectSchema<{
			readonly block_version: import("valibot").OptionalSchema<import("valibot").NumberSchema<undefined>, undefined>;
			readonly protected: import("valibot").OptionalSchema<import("valibot").BooleanSchema<undefined>, undefined>;
			readonly raw: import("valibot").OptionalSchema<import("valibot").StringSchema<undefined>, undefined>;
			readonly rendered: import("valibot").StringSchema<undefined>;
		}, undefined>;
		readonly meta: import("valibot").OptionalSchema<import("valibot").UnionSchema<[import("valibot").AnySchema, ArraySchema<import("valibot").NeverSchema<undefined>, undefined>], undefined>, undefined>;
		readonly template: import("valibot").StringSchema<undefined>;
		readonly title: import("valibot").ObjectSchema<{
			readonly block_version: import("valibot").OptionalSchema<import("valibot").NumberSchema<undefined>, undefined>;
			readonly protected: import("valibot").OptionalSchema<import("valibot").BooleanSchema<undefined>, undefined>;
			readonly raw: import("valibot").OptionalSchema<import("valibot").StringSchema<undefined>, undefined>;
			readonly rendered: import("valibot").StringSchema<undefined>;
		}, undefined>;
		readonly description: import("valibot").ObjectSchema<{
			readonly block_version: import("valibot").OptionalSchema<import("valibot").NumberSchema<undefined>, undefined>;
			readonly protected: import("valibot").OptionalSchema<import("valibot").BooleanSchema<undefined>, undefined>;
			readonly raw: import("valibot").OptionalSchema<import("valibot").StringSchema<undefined>, undefined>;
			readonly rendered: import("valibot").StringSchema<undefined>;
		}, undefined>;
		readonly status: import("valibot").StringSchema<undefined>;
		readonly date: import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").ToDateAction<string, undefined>]>;
		readonly mime_type: import("valibot").StringSchema<undefined>;
		readonly slug: import("valibot").StringSchema<undefined>;
		readonly author: import("valibot").SchemaWithPipe<readonly [import("valibot").NumberSchema<undefined>, import("valibot").MinValueAction<number, 1, undefined>]>;
		readonly modified: import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").ToDateAction<string, undefined>]>;
		readonly media_type: import("valibot").StringSchema<undefined>;
		readonly post: import("valibot").NullableSchema<import("valibot").NumberSchema<undefined>, undefined>;
		readonly _links: import("valibot").OptionalSchema<import("valibot").RecordSchema<import("valibot").StringSchema<undefined>, ArraySchema<import("valibot").ObjectSchema<{
			readonly embeddable: import("valibot").OptionalSchema<import("valibot").BooleanSchema<undefined>, undefined>;
			readonly href: import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").UrlAction<string, undefined>]>;
			readonly templated: import("valibot").OptionalSchema<import("valibot").BooleanSchema<undefined>, undefined>;
			readonly type: import("valibot").OptionalSchema<import("valibot").StringSchema<undefined>, undefined>;
		}, undefined>, undefined>, undefined>, undefined>;
		readonly guid: import("valibot").ObjectSchema<{
			readonly raw: import("valibot").OptionalSchema<import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").UrlAction<string, undefined>]>, undefined>;
			readonly rendered: import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").UrlAction<string, undefined>]>;
		}, undefined>;
		readonly comment_status: import("valibot").PicklistSchema<["open", "closed"], undefined>;
		readonly date_gmt: import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").ToDateAction<string, undefined>]>;
		readonly modified_gmt: import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").ToDateAction<string, undefined>]>;
		readonly ping_status: import("valibot").PicklistSchema<["open", "closed"], undefined>;
		readonly source_url: import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").UrlAction<string, undefined>]>;
		readonly media_details: import("valibot").ObjectSchema<{
			readonly bitrate: import("valibot").OptionalSchema<import("valibot").NumberSchema<undefined>, undefined>;
			readonly dataformat: import("valibot").OptionalSchema<import("valibot").StringSchema<undefined>, undefined>;
			readonly file: import("valibot").OptionalSchema<import("valibot").StringSchema<undefined>, undefined>;
			readonly fileformat: import("valibot").OptionalSchema<import("valibot").StringSchema<undefined>, undefined>;
			readonly filesize: import("valibot").NumberSchema<undefined>;
			readonly height: import("valibot").OptionalSchema<import("valibot").NumberSchema<undefined>, undefined>;
			readonly image_meta: import("valibot").OptionalSchema<import("valibot").RecordSchema<import("valibot").StringSchema<undefined>, import("valibot").AnySchema, undefined>, undefined>;
			readonly length: import("valibot").OptionalSchema<import("valibot").NumberSchema<undefined>, undefined>;
			readonly length_formatted: import("valibot").OptionalSchema<import("valibot").StringSchema<undefined>, undefined>;
			readonly width: import("valibot").OptionalSchema<import("valibot").NumberSchema<undefined>, undefined>;
			readonly sizes: import("valibot").OptionalSchema<import("valibot").RecordSchema<import("valibot").StringSchema<undefined>, import("valibot").ObjectSchema<{
				readonly file: import("valibot").StringSchema<undefined>;
				readonly height: import("valibot").NumberSchema<undefined>;
				readonly mime_type: import("valibot").StringSchema<undefined>;
				readonly source_url: import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").UrlAction<string, undefined>]>;
				readonly width: import("valibot").NumberSchema<undefined>;
			}, undefined>, undefined>, undefined>;
		}, undefined>;
		readonly alt_text: import("valibot").StringSchema<undefined>;
		readonly generated_slug: import("valibot").StringSchema<undefined>;
		readonly permalink_template: import("valibot").StringSchema<undefined>;
	}, undefined>;
	export type WP_Image_Size = InferOutput<typeof ImageSizeSchema>;
	export type WP_Media_Embed = InferOutput<typeof MediaEmbedSchema>;
	export type WP_Media = InferOutput<typeof MediaViewSchema>;
	export type WP_Media_Edit = InferOutput<typeof MediaEditSchema>;
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
	 * @return {Promise<InferOutput<typeof PostQuerySchemas[C]>>} Single post data.
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
	 * @return {Promise<InferOutput<ArraySchema<typeof PostQuerySchemas[C], undefined>>>} Post collection.
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
	export const PostEditBaseSchema: import("valibot").ObjectSchema<{
		readonly generated_slug: import("valibot").StringSchema<undefined>;
		readonly permalink_template: import("valibot").StringSchema<undefined>;
	}, undefined>;

	export const PostEmbedSchema: import("valibot").ObjectSchema<{
		readonly author: import("valibot").SchemaWithPipe<readonly [import("valibot").NumberSchema<undefined>, import("valibot").MinValueAction<number, 1, undefined>]>;
		readonly date: import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").ToDateAction<string, undefined>]>;
		readonly excerpt: import("valibot").ObjectSchema<{
			readonly block_version: import("valibot").OptionalSchema<import("valibot").NumberSchema<undefined>, undefined>;
			readonly protected: import("valibot").OptionalSchema<import("valibot").BooleanSchema<undefined>, undefined>;
			readonly raw: import("valibot").OptionalSchema<import("valibot").StringSchema<undefined>, undefined>;
			readonly rendered: import("valibot").StringSchema<undefined>;
		}, undefined>;
		readonly featured_media: import("valibot").NumberSchema<undefined>;
		readonly id: import("valibot").NumberSchema<undefined>;
		readonly link: import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").UrlAction<string, undefined>]>;
		readonly slug: import("valibot").StringSchema<undefined>;
		readonly title: import("valibot").ObjectSchema<{
			readonly block_version: import("valibot").OptionalSchema<import("valibot").NumberSchema<undefined>, undefined>;
			readonly protected: import("valibot").OptionalSchema<import("valibot").BooleanSchema<undefined>, undefined>;
			readonly raw: import("valibot").OptionalSchema<import("valibot").StringSchema<undefined>, undefined>;
			readonly rendered: import("valibot").StringSchema<undefined>;
		}, undefined>;
		readonly type: import("valibot").StringSchema<undefined>;
		readonly _links: import("valibot").OptionalSchema<import("valibot").RecordSchema<import("valibot").StringSchema<undefined>, ArraySchema<import("valibot").ObjectSchema<{
			readonly embeddable: import("valibot").OptionalSchema<import("valibot").BooleanSchema<undefined>, undefined>;
			readonly href: import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").UrlAction<string, undefined>]>;
			readonly templated: import("valibot").OptionalSchema<import("valibot").BooleanSchema<undefined>, undefined>;
			readonly type: import("valibot").OptionalSchema<import("valibot").StringSchema<undefined>, undefined>;
		}, undefined>, undefined>, undefined>, undefined>;
	}, undefined>;

	export const PostViewSchema: import("valibot").ObjectSchema<{
		readonly link: import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").UrlAction<string, undefined>]>;
		readonly type: import("valibot").StringSchema<undefined>;
		readonly id: import("valibot").NumberSchema<undefined>;
		readonly title: import("valibot").ObjectSchema<{
			readonly block_version: import("valibot").OptionalSchema<import("valibot").NumberSchema<undefined>, undefined>;
			readonly protected: import("valibot").OptionalSchema<import("valibot").BooleanSchema<undefined>, undefined>;
			readonly raw: import("valibot").OptionalSchema<import("valibot").StringSchema<undefined>, undefined>;
			readonly rendered: import("valibot").StringSchema<undefined>;
		}, undefined>;
		readonly date: import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").ToDateAction<string, undefined>]>;
		readonly slug: import("valibot").StringSchema<undefined>;
		readonly author: import("valibot").SchemaWithPipe<readonly [import("valibot").NumberSchema<undefined>, import("valibot").MinValueAction<number, 1, undefined>]>;
		readonly _links: import("valibot").OptionalSchema<import("valibot").RecordSchema<import("valibot").StringSchema<undefined>, ArraySchema<import("valibot").ObjectSchema<{
			readonly embeddable: import("valibot").OptionalSchema<import("valibot").BooleanSchema<undefined>, undefined>;
			readonly href: import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").UrlAction<string, undefined>]>;
			readonly templated: import("valibot").OptionalSchema<import("valibot").BooleanSchema<undefined>, undefined>;
			readonly type: import("valibot").OptionalSchema<import("valibot").StringSchema<undefined>, undefined>;
		}, undefined>, undefined>, undefined>, undefined>;
		readonly excerpt: import("valibot").ObjectSchema<{
			readonly block_version: import("valibot").OptionalSchema<import("valibot").NumberSchema<undefined>, undefined>;
			readonly protected: import("valibot").OptionalSchema<import("valibot").BooleanSchema<undefined>, undefined>;
			readonly raw: import("valibot").OptionalSchema<import("valibot").StringSchema<undefined>, undefined>;
			readonly rendered: import("valibot").StringSchema<undefined>;
		}, undefined>;
		readonly featured_media: import("valibot").NumberSchema<undefined>;
		readonly comment_status: import("valibot").PicklistSchema<["open", "closed"], undefined>;
		readonly content: import("valibot").ObjectSchema<{
			readonly block_version: import("valibot").OptionalSchema<import("valibot").NumberSchema<undefined>, undefined>;
			readonly protected: import("valibot").OptionalSchema<import("valibot").BooleanSchema<undefined>, undefined>;
			readonly raw: import("valibot").OptionalSchema<import("valibot").StringSchema<undefined>, undefined>;
			readonly rendered: import("valibot").StringSchema<undefined>;
		}, undefined>;
		readonly date_gmt: import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").ToDateAction<string, undefined>]>;
		readonly format: import("valibot").OptionalSchema<import("valibot").StringSchema<undefined>, undefined>;
		readonly menu_order: import("valibot").OptionalSchema<import("valibot").NumberSchema<undefined>, undefined>;
		readonly meta: import("valibot").OptionalSchema<import("valibot").UnionSchema<[import("valibot").AnySchema, ArraySchema<import("valibot").NeverSchema<undefined>, undefined>], undefined>, undefined>;
		readonly modified: import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").ToDateAction<string, undefined>]>;
		readonly modified_gmt: import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").ToDateAction<string, undefined>]>;
		readonly parent: import("valibot").OptionalSchema<import("valibot").NumberSchema<undefined>, undefined>;
		readonly ping_status: import("valibot").PicklistSchema<["open", "closed"], undefined>;
		readonly status: import("valibot").StringSchema<undefined>;
		readonly sticky: import("valibot").OptionalSchema<import("valibot").BooleanSchema<undefined>, undefined>;
		readonly template: import("valibot").StringSchema<undefined>;
		readonly guid: import("valibot").ObjectSchema<{
			readonly raw: import("valibot").OptionalSchema<import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").UrlAction<string, undefined>]>, undefined>;
			readonly rendered: import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").UrlAction<string, undefined>]>;
		}, undefined>;
	}, undefined>;

	export const PostEditSchema: import("valibot").ObjectSchema<{
		readonly link: import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").UrlAction<string, undefined>]>;
		readonly type: import("valibot").StringSchema<undefined>;
		readonly format: import("valibot").OptionalSchema<import("valibot").StringSchema<undefined>, undefined>;
		readonly id: import("valibot").NumberSchema<undefined>;
		readonly content: import("valibot").ObjectSchema<{
			readonly block_version: import("valibot").OptionalSchema<import("valibot").NumberSchema<undefined>, undefined>;
			readonly protected: import("valibot").OptionalSchema<import("valibot").BooleanSchema<undefined>, undefined>;
			readonly raw: import("valibot").OptionalSchema<import("valibot").StringSchema<undefined>, undefined>;
			readonly rendered: import("valibot").StringSchema<undefined>;
		}, undefined>;
		readonly meta: import("valibot").OptionalSchema<import("valibot").UnionSchema<[import("valibot").AnySchema, ArraySchema<import("valibot").NeverSchema<undefined>, undefined>], undefined>, undefined>;
		readonly template: import("valibot").StringSchema<undefined>;
		readonly title: import("valibot").ObjectSchema<{
			readonly block_version: import("valibot").OptionalSchema<import("valibot").NumberSchema<undefined>, undefined>;
			readonly protected: import("valibot").OptionalSchema<import("valibot").BooleanSchema<undefined>, undefined>;
			readonly raw: import("valibot").OptionalSchema<import("valibot").StringSchema<undefined>, undefined>;
			readonly rendered: import("valibot").StringSchema<undefined>;
		}, undefined>;
		readonly parent: import("valibot").OptionalSchema<import("valibot").NumberSchema<undefined>, undefined>;
		readonly status: import("valibot").StringSchema<undefined>;
		readonly date: import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").ToDateAction<string, undefined>]>;
		readonly slug: import("valibot").StringSchema<undefined>;
		readonly author: import("valibot").SchemaWithPipe<readonly [import("valibot").NumberSchema<undefined>, import("valibot").MinValueAction<number, 1, undefined>]>;
		readonly sticky: import("valibot").OptionalSchema<import("valibot").BooleanSchema<undefined>, undefined>;
		readonly modified: import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").ToDateAction<string, undefined>]>;
		readonly _links: import("valibot").OptionalSchema<import("valibot").RecordSchema<import("valibot").StringSchema<undefined>, ArraySchema<import("valibot").ObjectSchema<{
			readonly embeddable: import("valibot").OptionalSchema<import("valibot").BooleanSchema<undefined>, undefined>;
			readonly href: import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").UrlAction<string, undefined>]>;
			readonly templated: import("valibot").OptionalSchema<import("valibot").BooleanSchema<undefined>, undefined>;
			readonly type: import("valibot").OptionalSchema<import("valibot").StringSchema<undefined>, undefined>;
		}, undefined>, undefined>, undefined>, undefined>;
		readonly excerpt: import("valibot").ObjectSchema<{
			readonly block_version: import("valibot").OptionalSchema<import("valibot").NumberSchema<undefined>, undefined>;
			readonly protected: import("valibot").OptionalSchema<import("valibot").BooleanSchema<undefined>, undefined>;
			readonly raw: import("valibot").OptionalSchema<import("valibot").StringSchema<undefined>, undefined>;
			readonly rendered: import("valibot").StringSchema<undefined>;
		}, undefined>;
		readonly featured_media: import("valibot").NumberSchema<undefined>;
		readonly menu_order: import("valibot").OptionalSchema<import("valibot").NumberSchema<undefined>, undefined>;
		readonly guid: import("valibot").ObjectSchema<{
			readonly raw: import("valibot").OptionalSchema<import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").UrlAction<string, undefined>]>, undefined>;
			readonly rendered: import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").UrlAction<string, undefined>]>;
		}, undefined>;
		readonly comment_status: import("valibot").PicklistSchema<["open", "closed"], undefined>;
		readonly date_gmt: import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").ToDateAction<string, undefined>]>;
		readonly modified_gmt: import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").ToDateAction<string, undefined>]>;
		readonly ping_status: import("valibot").PicklistSchema<["open", "closed"], undefined>;
		readonly generated_slug: import("valibot").StringSchema<undefined>;
		readonly permalink_template: import("valibot").StringSchema<undefined>;
	}, undefined>;
	export type WP_Post_Terms = {
		taxonomy: WP_Taxonomy;
		terms: WP_Term[];
	};
	export type WP_Post_Embed = InferOutput<typeof PostEmbedSchema>;
	export type WP_Post = InferOutput<typeof PostViewSchema>;
	export type WP_Post_Edit = InferOutput<typeof PostEditSchema>;
	namespace PostQuerySchemas {
		export { PostEditSchema as edit };
		export { PostEmbedSchema as embed };
		export { PostViewSchema as view };
	}
	export const CommentStatusSchema: import("valibot").PicklistSchema<["open", "closed"], undefined>;
	export const DateItemSchema: import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").ToDateAction<string, undefined>]>;
	export const EmailSchema: import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").EmailAction<string, undefined>]>;
	export const IdSchema: import("valibot").SchemaWithPipe<readonly [import("valibot").NumberSchema<undefined>, import("valibot").MinValueAction<number, 1, undefined>]>;
	export const UrlSchema: import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").UrlAction<string, undefined>]>;
	export const LinkItemSchema: import("valibot").ArraySchema<import("valibot").ObjectSchema<{
		readonly embeddable: import("valibot").OptionalSchema<import("valibot").BooleanSchema<undefined>, undefined>;
		readonly href: import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").UrlAction<string, undefined>]>;
		readonly templated: import("valibot").OptionalSchema<import("valibot").BooleanSchema<undefined>, undefined>;
		readonly type: import("valibot").OptionalSchema<import("valibot").StringSchema<undefined>, undefined>;
	}, undefined>, undefined>;

	export const MetaSchema: import("valibot").OptionalSchema<import("valibot").UnionSchema<[import("valibot").AnySchema, import("valibot").ArraySchema<import("valibot").NeverSchema<undefined>, undefined>], undefined>, undefined>;
	export const RenderableItemSchema: import("valibot").ObjectSchema<{
		readonly block_version: import("valibot").OptionalSchema<import("valibot").NumberSchema<undefined>, undefined>;
		readonly protected: import("valibot").OptionalSchema<import("valibot").BooleanSchema<undefined>, undefined>;
		readonly raw: import("valibot").OptionalSchema<import("valibot").StringSchema<undefined>, undefined>;
		readonly rendered: import("valibot").StringSchema<undefined>;
	}, undefined>;

	export const RestErrorSchema: import("valibot").ObjectSchema<{
		readonly code: import("valibot").StringSchema<undefined>;
		readonly message: import("valibot").StringSchema<undefined>;
		readonly data: import("valibot").ObjectSchema<{
			readonly status: import("valibot").NumberSchema<undefined>;
		}, undefined>;
	}, undefined>;
	export type Meta = InferOutput<typeof MetaSchema>;
	export type RestError = InferOutput<typeof RestErrorSchema>;
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

	export const SettingsSchema: import("valibot").ObjectSchema<{
		readonly date_format: import("valibot").StringSchema<undefined>;
		readonly default_category: import("valibot").NumberSchema<undefined>;
		readonly default_comment_status: import("valibot").PicklistSchema<["open", "closed"], undefined>;
		readonly default_ping_status: import("valibot").PicklistSchema<["open", "closed"], undefined>;
		readonly default_post_format: import("valibot").StringSchema<undefined>;
		readonly description: import("valibot").StringSchema<undefined>;
		readonly email: import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").EmailAction<string, undefined>]>;
		readonly language: import("valibot").StringSchema<undefined>;
		readonly page_for_posts: import("valibot").NumberSchema<undefined>;
		readonly page_on_front: import("valibot").NumberSchema<undefined>;
		readonly posts_per_page: import("valibot").NumberSchema<undefined>;
		readonly show_on_front: import("valibot").PicklistSchema<["page", "posts"], undefined>;
		readonly site_icon: import("valibot").NullableSchema<import("valibot").NumberSchema<undefined>, undefined>;
		readonly site_logo: import("valibot").NullableSchema<import("valibot").NumberSchema<undefined>, undefined>;
		readonly start_of_week: import("valibot").NumberSchema<undefined>;
		readonly time_format: import("valibot").StringSchema<undefined>;
		readonly timezone: import("valibot").StringSchema<undefined>;
		readonly title: import("valibot").StringSchema<undefined>;
		readonly url: import("valibot").StringSchema<undefined>;
		readonly use_smilies: import("valibot").BooleanSchema<undefined>;
	}, undefined>;
	export type WP_Settings = InferOutput<typeof SettingsSchema>;
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
	 * @return {Promise<InferOutput<ArraySchema<typeof TaxQuerySchemas[C], undefined>>>} Taxonomy collection.
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
	 * @return {Promise<InferOutput<TaxQuerySchemas[C]>>} Taxonomy collection.
	 */
	export function get_single_taxonomy<C extends keyof typeof TaxQuerySchemas>(name: string, url: string, context: C, auth?: string | undefined): Promise<InferOutput<{
		edit: import("valibot").ObjectSchema<{
			readonly name: import("valibot").StringSchema<undefined>;
			readonly description: import("valibot").StringSchema<undefined>;
			readonly slug: import("valibot").StringSchema<undefined>;
			readonly _links: import("valibot").ObjectSchema<{
				readonly collection: ArraySchema<import("valibot").ObjectSchema<{
					readonly embeddable: import("valibot").OptionalSchema<import("valibot").BooleanSchema<undefined>, undefined>;
					readonly href: import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").UrlAction<string, undefined>]>;
					readonly templated: import("valibot").OptionalSchema<import("valibot").BooleanSchema<undefined>, undefined>;
					readonly type: import("valibot").OptionalSchema<import("valibot").StringSchema<undefined>, undefined>;
				}, undefined>, undefined>;
				readonly 'wp:items': ArraySchema<import("valibot").ObjectSchema<{
					readonly embeddable: import("valibot").OptionalSchema<import("valibot").BooleanSchema<undefined>, undefined>;
					readonly href: import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").UrlAction<string, undefined>]>;
					readonly templated: import("valibot").OptionalSchema<import("valibot").BooleanSchema<undefined>, undefined>;
					readonly type: import("valibot").OptionalSchema<import("valibot").StringSchema<undefined>, undefined>;
				}, undefined>, undefined>;
			}, undefined>;
			readonly rest_base: import("valibot").StringSchema<undefined>;
			readonly rest_namespace: import("valibot").StringSchema<undefined>;
			readonly types: ArraySchema<import("valibot").StringSchema<undefined>, undefined>;
			readonly hierarchical: import("valibot").BooleanSchema<undefined>;
			readonly capabilities: import("valibot").RecordSchema<import("valibot").StringSchema<undefined>, import("valibot").StringSchema<undefined>, undefined>;
			readonly labels: import("valibot").ObjectSchema<{
				readonly add_new_item: import("valibot").StringSchema<undefined>;
				readonly add_or_remove_items: import("valibot").NullableSchema<import("valibot").StringSchema<undefined>, undefined>;
				readonly all_items: import("valibot").StringSchema<undefined>;
				readonly archives: import("valibot").OptionalSchema<import("valibot").StringSchema<undefined>, undefined>;
				readonly back_to_items: import("valibot").StringSchema<undefined>;
				readonly choose_from_most_used: import("valibot").NullableSchema<import("valibot").StringSchema<undefined>, undefined>;
				readonly desc_field_description: import("valibot").StringSchema<undefined>;
				readonly edit_item: import("valibot").StringSchema<undefined>;
				readonly filter_by_item: import("valibot").NullableSchema<import("valibot").StringSchema<undefined>, undefined>;
				readonly item_link_description: import("valibot").StringSchema<undefined>;
				readonly item_link: import("valibot").StringSchema<undefined>;
				readonly items_list_navigation: import("valibot").StringSchema<undefined>;
				readonly items_list: import("valibot").StringSchema<undefined>;
				readonly menu_name: import("valibot").StringSchema<undefined>;
				readonly most_used: import("valibot").StringSchema<undefined>;
				readonly name_admin_bar: import("valibot").StringSchema<undefined>;
				readonly name_field_description: import("valibot").StringSchema<undefined>;
				readonly name: import("valibot").StringSchema<undefined>;
				readonly new_item_name: import("valibot").StringSchema<undefined>;
				readonly no_terms: import("valibot").StringSchema<undefined>;
				readonly not_found: import("valibot").StringSchema<undefined>;
				readonly parent_field_description: import("valibot").NullableSchema<import("valibot").StringSchema<undefined>, undefined>;
				readonly parent_item_colon: import("valibot").NullableSchema<import("valibot").StringSchema<undefined>, undefined>;
				readonly parent_item: import("valibot").StringSchema<undefined>;
				readonly popular_items: import("valibot").NullableSchema<import("valibot").StringSchema<undefined>, undefined>;
				readonly search_items: import("valibot").StringSchema<undefined>;
				readonly separate_items_with_commas: import("valibot").NullableSchema<import("valibot").StringSchema<undefined>, undefined>;
				readonly singular_name: import("valibot").StringSchema<undefined>;
				readonly slug_field_description: import("valibot").StringSchema<undefined>;
				readonly update_item: import("valibot").StringSchema<undefined>;
				readonly view_item: import("valibot").StringSchema<undefined>;
			}, undefined>;
			readonly show_cloud: import("valibot").BooleanSchema<undefined>;
			readonly visibility: import("valibot").ObjectSchema<{
				readonly public: import("valibot").BooleanSchema<undefined>;
				readonly publicly_queryable: import("valibot").BooleanSchema<undefined>;
				readonly show_admin_column: import("valibot").BooleanSchema<undefined>;
				readonly show_in_nav_menus: import("valibot").BooleanSchema<undefined>;
				readonly show_in_quick_edit: import("valibot").BooleanSchema<undefined>;
				readonly show_ui: import("valibot").BooleanSchema<undefined>;
			}, undefined>;
		}, undefined>;
		embed: import("valibot").ObjectSchema<{
			readonly name: import("valibot").StringSchema<undefined>;
			readonly rest_base: import("valibot").StringSchema<undefined>;
			readonly rest_namespace: import("valibot").StringSchema<undefined>;
			readonly slug: import("valibot").StringSchema<undefined>;
			readonly _links: import("valibot").ObjectSchema<{
				readonly collection: ArraySchema<import("valibot").ObjectSchema<{
					readonly embeddable: import("valibot").OptionalSchema<import("valibot").BooleanSchema<undefined>, undefined>;
					readonly href: import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").UrlAction<string, undefined>]>;
					readonly templated: import("valibot").OptionalSchema<import("valibot").BooleanSchema<undefined>, undefined>;
					readonly type: import("valibot").OptionalSchema<import("valibot").StringSchema<undefined>, undefined>;
				}, undefined>, undefined>;
				readonly 'wp:items': ArraySchema<import("valibot").ObjectSchema<{
					readonly embeddable: import("valibot").OptionalSchema<import("valibot").BooleanSchema<undefined>, undefined>;
					readonly href: import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").UrlAction<string, undefined>]>;
					readonly templated: import("valibot").OptionalSchema<import("valibot").BooleanSchema<undefined>, undefined>;
					readonly type: import("valibot").OptionalSchema<import("valibot").StringSchema<undefined>, undefined>;
				}, undefined>, undefined>;
			}, undefined>;
		}, undefined>;
		view: import("valibot").ObjectSchema<{
			readonly name: import("valibot").StringSchema<undefined>;
			readonly slug: import("valibot").StringSchema<undefined>;
			readonly _links: import("valibot").ObjectSchema<{
				readonly collection: ArraySchema<import("valibot").ObjectSchema<{
					readonly embeddable: import("valibot").OptionalSchema<import("valibot").BooleanSchema<undefined>, undefined>;
					readonly href: import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").UrlAction<string, undefined>]>;
					readonly templated: import("valibot").OptionalSchema<import("valibot").BooleanSchema<undefined>, undefined>;
					readonly type: import("valibot").OptionalSchema<import("valibot").StringSchema<undefined>, undefined>;
				}, undefined>, undefined>;
				readonly 'wp:items': ArraySchema<import("valibot").ObjectSchema<{
					readonly embeddable: import("valibot").OptionalSchema<import("valibot").BooleanSchema<undefined>, undefined>;
					readonly href: import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").UrlAction<string, undefined>]>;
					readonly templated: import("valibot").OptionalSchema<import("valibot").BooleanSchema<undefined>, undefined>;
					readonly type: import("valibot").OptionalSchema<import("valibot").StringSchema<undefined>, undefined>;
				}, undefined>, undefined>;
			}, undefined>;
			readonly rest_base: import("valibot").StringSchema<undefined>;
			readonly rest_namespace: import("valibot").StringSchema<undefined>;
			readonly description: import("valibot").StringSchema<undefined>;
			readonly hierarchical: import("valibot").BooleanSchema<undefined>;
			readonly types: ArraySchema<import("valibot").StringSchema<undefined>, undefined>;
		}, undefined>;
	}[C]>>;

	export const TaxonomyEmbedSchema: import("valibot").ObjectSchema<{
		readonly name: import("valibot").StringSchema<undefined>;
		readonly rest_base: import("valibot").StringSchema<undefined>;
		readonly rest_namespace: import("valibot").StringSchema<undefined>;
		readonly slug: import("valibot").StringSchema<undefined>;
		readonly _links: import("valibot").ObjectSchema<{
			readonly collection: ArraySchema<import("valibot").ObjectSchema<{
				readonly embeddable: import("valibot").OptionalSchema<import("valibot").BooleanSchema<undefined>, undefined>;
				readonly href: import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").UrlAction<string, undefined>]>;
				readonly templated: import("valibot").OptionalSchema<import("valibot").BooleanSchema<undefined>, undefined>;
				readonly type: import("valibot").OptionalSchema<import("valibot").StringSchema<undefined>, undefined>;
			}, undefined>, undefined>;
			readonly 'wp:items': ArraySchema<import("valibot").ObjectSchema<{
				readonly embeddable: import("valibot").OptionalSchema<import("valibot").BooleanSchema<undefined>, undefined>;
				readonly href: import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").UrlAction<string, undefined>]>;
				readonly templated: import("valibot").OptionalSchema<import("valibot").BooleanSchema<undefined>, undefined>;
				readonly type: import("valibot").OptionalSchema<import("valibot").StringSchema<undefined>, undefined>;
			}, undefined>, undefined>;
		}, undefined>;
	}, undefined>;

	export const TaxonomyViewSchema: import("valibot").ObjectSchema<{
		readonly name: import("valibot").StringSchema<undefined>;
		readonly slug: import("valibot").StringSchema<undefined>;
		readonly _links: import("valibot").ObjectSchema<{
			readonly collection: ArraySchema<import("valibot").ObjectSchema<{
				readonly embeddable: import("valibot").OptionalSchema<import("valibot").BooleanSchema<undefined>, undefined>;
				readonly href: import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").UrlAction<string, undefined>]>;
				readonly templated: import("valibot").OptionalSchema<import("valibot").BooleanSchema<undefined>, undefined>;
				readonly type: import("valibot").OptionalSchema<import("valibot").StringSchema<undefined>, undefined>;
			}, undefined>, undefined>;
			readonly 'wp:items': ArraySchema<import("valibot").ObjectSchema<{
				readonly embeddable: import("valibot").OptionalSchema<import("valibot").BooleanSchema<undefined>, undefined>;
				readonly href: import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").UrlAction<string, undefined>]>;
				readonly templated: import("valibot").OptionalSchema<import("valibot").BooleanSchema<undefined>, undefined>;
				readonly type: import("valibot").OptionalSchema<import("valibot").StringSchema<undefined>, undefined>;
			}, undefined>, undefined>;
		}, undefined>;
		readonly rest_base: import("valibot").StringSchema<undefined>;
		readonly rest_namespace: import("valibot").StringSchema<undefined>;
		readonly description: import("valibot").StringSchema<undefined>;
		readonly hierarchical: import("valibot").BooleanSchema<undefined>;
		readonly types: ArraySchema<import("valibot").StringSchema<undefined>, undefined>;
	}, undefined>;

	export const TaxonomyEditSchema: import("valibot").ObjectSchema<{
		readonly name: import("valibot").StringSchema<undefined>;
		readonly description: import("valibot").StringSchema<undefined>;
		readonly slug: import("valibot").StringSchema<undefined>;
		readonly _links: import("valibot").ObjectSchema<{
			readonly collection: ArraySchema<import("valibot").ObjectSchema<{
				readonly embeddable: import("valibot").OptionalSchema<import("valibot").BooleanSchema<undefined>, undefined>;
				readonly href: import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").UrlAction<string, undefined>]>;
				readonly templated: import("valibot").OptionalSchema<import("valibot").BooleanSchema<undefined>, undefined>;
				readonly type: import("valibot").OptionalSchema<import("valibot").StringSchema<undefined>, undefined>;
			}, undefined>, undefined>;
			readonly 'wp:items': ArraySchema<import("valibot").ObjectSchema<{
				readonly embeddable: import("valibot").OptionalSchema<import("valibot").BooleanSchema<undefined>, undefined>;
				readonly href: import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").UrlAction<string, undefined>]>;
				readonly templated: import("valibot").OptionalSchema<import("valibot").BooleanSchema<undefined>, undefined>;
				readonly type: import("valibot").OptionalSchema<import("valibot").StringSchema<undefined>, undefined>;
			}, undefined>, undefined>;
		}, undefined>;
		readonly rest_base: import("valibot").StringSchema<undefined>;
		readonly rest_namespace: import("valibot").StringSchema<undefined>;
		readonly types: ArraySchema<import("valibot").StringSchema<undefined>, undefined>;
		readonly hierarchical: import("valibot").BooleanSchema<undefined>;
		readonly capabilities: import("valibot").RecordSchema<import("valibot").StringSchema<undefined>, import("valibot").StringSchema<undefined>, undefined>;
		readonly labels: import("valibot").ObjectSchema<{
			readonly add_new_item: import("valibot").StringSchema<undefined>;
			readonly add_or_remove_items: import("valibot").NullableSchema<import("valibot").StringSchema<undefined>, undefined>;
			readonly all_items: import("valibot").StringSchema<undefined>;
			readonly archives: import("valibot").OptionalSchema<import("valibot").StringSchema<undefined>, undefined>;
			readonly back_to_items: import("valibot").StringSchema<undefined>;
			readonly choose_from_most_used: import("valibot").NullableSchema<import("valibot").StringSchema<undefined>, undefined>;
			readonly desc_field_description: import("valibot").StringSchema<undefined>;
			readonly edit_item: import("valibot").StringSchema<undefined>;
			readonly filter_by_item: import("valibot").NullableSchema<import("valibot").StringSchema<undefined>, undefined>;
			readonly item_link_description: import("valibot").StringSchema<undefined>;
			readonly item_link: import("valibot").StringSchema<undefined>;
			readonly items_list_navigation: import("valibot").StringSchema<undefined>;
			readonly items_list: import("valibot").StringSchema<undefined>;
			readonly menu_name: import("valibot").StringSchema<undefined>;
			readonly most_used: import("valibot").StringSchema<undefined>;
			readonly name_admin_bar: import("valibot").StringSchema<undefined>;
			readonly name_field_description: import("valibot").StringSchema<undefined>;
			readonly name: import("valibot").StringSchema<undefined>;
			readonly new_item_name: import("valibot").StringSchema<undefined>;
			readonly no_terms: import("valibot").StringSchema<undefined>;
			readonly not_found: import("valibot").StringSchema<undefined>;
			readonly parent_field_description: import("valibot").NullableSchema<import("valibot").StringSchema<undefined>, undefined>;
			readonly parent_item_colon: import("valibot").NullableSchema<import("valibot").StringSchema<undefined>, undefined>;
			readonly parent_item: import("valibot").StringSchema<undefined>;
			readonly popular_items: import("valibot").NullableSchema<import("valibot").StringSchema<undefined>, undefined>;
			readonly search_items: import("valibot").StringSchema<undefined>;
			readonly separate_items_with_commas: import("valibot").NullableSchema<import("valibot").StringSchema<undefined>, undefined>;
			readonly singular_name: import("valibot").StringSchema<undefined>;
			readonly slug_field_description: import("valibot").StringSchema<undefined>;
			readonly update_item: import("valibot").StringSchema<undefined>;
			readonly view_item: import("valibot").StringSchema<undefined>;
		}, undefined>;
		readonly show_cloud: import("valibot").BooleanSchema<undefined>;
		readonly visibility: import("valibot").ObjectSchema<{
			readonly public: import("valibot").BooleanSchema<undefined>;
			readonly publicly_queryable: import("valibot").BooleanSchema<undefined>;
			readonly show_admin_column: import("valibot").BooleanSchema<undefined>;
			readonly show_in_nav_menus: import("valibot").BooleanSchema<undefined>;
			readonly show_in_quick_edit: import("valibot").BooleanSchema<undefined>;
			readonly show_ui: import("valibot").BooleanSchema<undefined>;
		}, undefined>;
	}, undefined>;
	export type WP_Taxonomy_Embed = InferOutput<typeof TaxonomyEmbedSchema>;
	export type WP_Taxonomy = InferOutput<typeof TaxonomyViewSchema>;
	export type WP_Taxonomy_Edit = InferOutput<typeof TaxonomyEditSchema>;
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
	 * @return {Promise<InferOutput<ArraySchema<typeof TermQuerySchemas[C], undefined>>>} Term collection.
	 */
	export function get_terms<C extends keyof typeof TermQuerySchemas>(url: string, taxonomy: string, context: C, auth?: string | undefined, args?: Fetch_Terms_Args | undefined): Promise<InferOutput<ArraySchema<(typeof TermQuerySchemas)[C], undefined>>>;

	export const TermEmbedSchema: import("valibot").ObjectSchema<{
		readonly id: import("valibot").SchemaWithPipe<readonly [import("valibot").NumberSchema<undefined>, import("valibot").MinValueAction<number, 1, undefined>]>;
		readonly link: import("valibot").StringSchema<undefined>;
		readonly name: import("valibot").StringSchema<undefined>;
		readonly slug: import("valibot").StringSchema<undefined>;
		readonly taxonomy: import("valibot").StringSchema<undefined>;
		readonly _links: import("valibot").ObjectSchema<{
			readonly about: ArraySchema<import("valibot").ObjectSchema<{
				readonly embeddable: import("valibot").OptionalSchema<import("valibot").BooleanSchema<undefined>, undefined>;
				readonly href: import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").UrlAction<string, undefined>]>;
				readonly templated: import("valibot").OptionalSchema<import("valibot").BooleanSchema<undefined>, undefined>;
				readonly type: import("valibot").OptionalSchema<import("valibot").StringSchema<undefined>, undefined>;
			}, undefined>, undefined>;
			readonly collection: ArraySchema<import("valibot").ObjectSchema<{
				readonly embeddable: import("valibot").OptionalSchema<import("valibot").BooleanSchema<undefined>, undefined>;
				readonly href: import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").UrlAction<string, undefined>]>;
				readonly templated: import("valibot").OptionalSchema<import("valibot").BooleanSchema<undefined>, undefined>;
				readonly type: import("valibot").OptionalSchema<import("valibot").StringSchema<undefined>, undefined>;
			}, undefined>, undefined>;
			readonly self: ArraySchema<import("valibot").ObjectSchema<{
				readonly embeddable: import("valibot").OptionalSchema<import("valibot").BooleanSchema<undefined>, undefined>;
				readonly href: import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").UrlAction<string, undefined>]>;
				readonly templated: import("valibot").OptionalSchema<import("valibot").BooleanSchema<undefined>, undefined>;
				readonly type: import("valibot").OptionalSchema<import("valibot").StringSchema<undefined>, undefined>;
			}, undefined>, undefined>;
			readonly 'wp:post_type': ArraySchema<import("valibot").ObjectSchema<{
				readonly embeddable: import("valibot").OptionalSchema<import("valibot").BooleanSchema<undefined>, undefined>;
				readonly href: import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").UrlAction<string, undefined>]>;
				readonly templated: import("valibot").OptionalSchema<import("valibot").BooleanSchema<undefined>, undefined>;
				readonly type: import("valibot").OptionalSchema<import("valibot").StringSchema<undefined>, undefined>;
			}, undefined>, undefined>;
		}, undefined>;
	}, undefined>;

	export const TermViewSchema: import("valibot").ObjectSchema<{
		readonly link: import("valibot").StringSchema<undefined>;
		readonly name: import("valibot").StringSchema<undefined>;
		readonly id: import("valibot").SchemaWithPipe<readonly [import("valibot").NumberSchema<undefined>, import("valibot").MinValueAction<number, 1, undefined>]>;
		readonly slug: import("valibot").StringSchema<undefined>;
		readonly _links: import("valibot").ObjectSchema<{
			readonly about: ArraySchema<import("valibot").ObjectSchema<{
				readonly embeddable: import("valibot").OptionalSchema<import("valibot").BooleanSchema<undefined>, undefined>;
				readonly href: import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").UrlAction<string, undefined>]>;
				readonly templated: import("valibot").OptionalSchema<import("valibot").BooleanSchema<undefined>, undefined>;
				readonly type: import("valibot").OptionalSchema<import("valibot").StringSchema<undefined>, undefined>;
			}, undefined>, undefined>;
			readonly collection: ArraySchema<import("valibot").ObjectSchema<{
				readonly embeddable: import("valibot").OptionalSchema<import("valibot").BooleanSchema<undefined>, undefined>;
				readonly href: import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").UrlAction<string, undefined>]>;
				readonly templated: import("valibot").OptionalSchema<import("valibot").BooleanSchema<undefined>, undefined>;
				readonly type: import("valibot").OptionalSchema<import("valibot").StringSchema<undefined>, undefined>;
			}, undefined>, undefined>;
			readonly self: ArraySchema<import("valibot").ObjectSchema<{
				readonly embeddable: import("valibot").OptionalSchema<import("valibot").BooleanSchema<undefined>, undefined>;
				readonly href: import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").UrlAction<string, undefined>]>;
				readonly templated: import("valibot").OptionalSchema<import("valibot").BooleanSchema<undefined>, undefined>;
				readonly type: import("valibot").OptionalSchema<import("valibot").StringSchema<undefined>, undefined>;
			}, undefined>, undefined>;
			readonly 'wp:post_type': ArraySchema<import("valibot").ObjectSchema<{
				readonly embeddable: import("valibot").OptionalSchema<import("valibot").BooleanSchema<undefined>, undefined>;
				readonly href: import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").UrlAction<string, undefined>]>;
				readonly templated: import("valibot").OptionalSchema<import("valibot").BooleanSchema<undefined>, undefined>;
				readonly type: import("valibot").OptionalSchema<import("valibot").StringSchema<undefined>, undefined>;
			}, undefined>, undefined>;
		}, undefined>;
		readonly taxonomy: import("valibot").StringSchema<undefined>;
		readonly meta: import("valibot").OptionalSchema<import("valibot").UnionSchema<[import("valibot").AnySchema, ArraySchema<import("valibot").NeverSchema<undefined>, undefined>], undefined>, undefined>;
		readonly count: import("valibot").NumberSchema<undefined>;
		readonly description: import("valibot").StringSchema<undefined>;
		readonly parent: import("valibot").NumberSchema<undefined>;
	}, undefined>;
	export type WP_Term_Embed = InferOutput<typeof TermEmbedSchema>;
	export type WP_Term = InferOutput<typeof TermViewSchema>;
	export type WP_Term_Edit = InferOutput<import("valibot").ObjectSchema<{
		readonly link: import("valibot").StringSchema<undefined>;
		readonly name: import("valibot").StringSchema<undefined>;
		readonly id: import("valibot").SchemaWithPipe<readonly [import("valibot").NumberSchema<undefined>, import("valibot").MinValueAction<number, 1, undefined>]>;
		readonly slug: import("valibot").StringSchema<undefined>;
		readonly _links: import("valibot").ObjectSchema<{
			readonly about: ArraySchema<import("valibot").ObjectSchema<{
				readonly embeddable: import("valibot").OptionalSchema<import("valibot").BooleanSchema<undefined>, undefined>;
				readonly href: import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").UrlAction<string, undefined>]>;
				readonly templated: import("valibot").OptionalSchema<import("valibot").BooleanSchema<undefined>, undefined>;
				readonly type: import("valibot").OptionalSchema<import("valibot").StringSchema<undefined>, undefined>;
			}, undefined>, undefined>;
			readonly collection: ArraySchema<import("valibot").ObjectSchema<{
				readonly embeddable: import("valibot").OptionalSchema<import("valibot").BooleanSchema<undefined>, undefined>;
				readonly href: import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").UrlAction<string, undefined>]>;
				readonly templated: import("valibot").OptionalSchema<import("valibot").BooleanSchema<undefined>, undefined>;
				readonly type: import("valibot").OptionalSchema<import("valibot").StringSchema<undefined>, undefined>;
			}, undefined>, undefined>;
			readonly self: ArraySchema<import("valibot").ObjectSchema<{
				readonly embeddable: import("valibot").OptionalSchema<import("valibot").BooleanSchema<undefined>, undefined>;
				readonly href: import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").UrlAction<string, undefined>]>;
				readonly templated: import("valibot").OptionalSchema<import("valibot").BooleanSchema<undefined>, undefined>;
				readonly type: import("valibot").OptionalSchema<import("valibot").StringSchema<undefined>, undefined>;
			}, undefined>, undefined>;
			readonly 'wp:post_type': ArraySchema<import("valibot").ObjectSchema<{
				readonly embeddable: import("valibot").OptionalSchema<import("valibot").BooleanSchema<undefined>, undefined>;
				readonly href: import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").UrlAction<string, undefined>]>;
				readonly templated: import("valibot").OptionalSchema<import("valibot").BooleanSchema<undefined>, undefined>;
				readonly type: import("valibot").OptionalSchema<import("valibot").StringSchema<undefined>, undefined>;
			}, undefined>, undefined>;
		}, undefined>;
		readonly taxonomy: import("valibot").StringSchema<undefined>;
		readonly meta: import("valibot").OptionalSchema<import("valibot").UnionSchema<[import("valibot").AnySchema, ArraySchema<import("valibot").NeverSchema<undefined>, undefined>], undefined>, undefined>;
		readonly count: import("valibot").NumberSchema<undefined>;
		readonly description: import("valibot").StringSchema<undefined>;
		readonly parent: import("valibot").NumberSchema<undefined>;
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
	 * @return {Promise<InferOutput<typeof UserQuerySchemas[C]>>} User data.
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
	 * @return {Promise<InferOutput<ArraySchema<typeof UserQuerySchemas[C], undefined>>>} User collection.
	 */
	export function get_users<C extends keyof typeof UserQuerySchemas>(url: string, context: C, auth?: string, args?: Fetch_Users_Args): Promise<InferOutput<ArraySchema<(typeof UserQuerySchemas)[C], undefined>>>;

	export const UserEmbedSchema: import("valibot").ObjectSchema<{
		readonly avatar_urls: import("valibot").RecordSchema<import("valibot").StringSchema<undefined>, import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").UrlAction<string, undefined>]>, undefined>;
		readonly description: import("valibot").StringSchema<undefined>;
		readonly id: import("valibot").SchemaWithPipe<readonly [import("valibot").NumberSchema<undefined>, import("valibot").MinValueAction<number, 1, undefined>]>;
		readonly name: import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").MinLengthAction<string, 1, undefined>]>;
		readonly url: import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").UrlAction<string, undefined>]>;
		readonly slug: import("valibot").StringSchema<undefined>;
		readonly _links: import("valibot").ObjectSchema<{
			readonly self: ArraySchema<import("valibot").ObjectSchema<{
				readonly embeddable: import("valibot").OptionalSchema<import("valibot").BooleanSchema<undefined>, undefined>;
				readonly href: import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").UrlAction<string, undefined>]>;
				readonly templated: import("valibot").OptionalSchema<import("valibot").BooleanSchema<undefined>, undefined>;
				readonly type: import("valibot").OptionalSchema<import("valibot").StringSchema<undefined>, undefined>;
			}, undefined>, undefined>;
			readonly collection: ArraySchema<import("valibot").ObjectSchema<{
				readonly embeddable: import("valibot").OptionalSchema<import("valibot").BooleanSchema<undefined>, undefined>;
				readonly href: import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").UrlAction<string, undefined>]>;
				readonly templated: import("valibot").OptionalSchema<import("valibot").BooleanSchema<undefined>, undefined>;
				readonly type: import("valibot").OptionalSchema<import("valibot").StringSchema<undefined>, undefined>;
			}, undefined>, undefined>;
		}, undefined>;
	}, undefined>;

	export const UserViewSchema: import("valibot").ObjectSchema<{
		readonly name: import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").MinLengthAction<string, 1, undefined>]>;
		readonly id: import("valibot").SchemaWithPipe<readonly [import("valibot").NumberSchema<undefined>, import("valibot").MinValueAction<number, 1, undefined>]>;
		readonly url: import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").UrlAction<string, undefined>]>;
		readonly description: import("valibot").StringSchema<undefined>;
		readonly slug: import("valibot").StringSchema<undefined>;
		readonly _links: import("valibot").ObjectSchema<{
			readonly self: ArraySchema<import("valibot").ObjectSchema<{
				readonly embeddable: import("valibot").OptionalSchema<import("valibot").BooleanSchema<undefined>, undefined>;
				readonly href: import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").UrlAction<string, undefined>]>;
				readonly templated: import("valibot").OptionalSchema<import("valibot").BooleanSchema<undefined>, undefined>;
				readonly type: import("valibot").OptionalSchema<import("valibot").StringSchema<undefined>, undefined>;
			}, undefined>, undefined>;
			readonly collection: ArraySchema<import("valibot").ObjectSchema<{
				readonly embeddable: import("valibot").OptionalSchema<import("valibot").BooleanSchema<undefined>, undefined>;
				readonly href: import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").UrlAction<string, undefined>]>;
				readonly templated: import("valibot").OptionalSchema<import("valibot").BooleanSchema<undefined>, undefined>;
				readonly type: import("valibot").OptionalSchema<import("valibot").StringSchema<undefined>, undefined>;
			}, undefined>, undefined>;
		}, undefined>;
		readonly avatar_urls: import("valibot").RecordSchema<import("valibot").StringSchema<undefined>, import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").UrlAction<string, undefined>]>, undefined>;
		readonly meta: import("valibot").OptionalSchema<import("valibot").UnionSchema<[import("valibot").AnySchema, ArraySchema<import("valibot").NeverSchema<undefined>, undefined>], undefined>, undefined>;
	}, undefined>;

	export const UserEditSchema: import("valibot").ObjectSchema<{
		readonly name: import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").MinLengthAction<string, 1, undefined>]>;
		readonly id: import("valibot").SchemaWithPipe<readonly [import("valibot").NumberSchema<undefined>, import("valibot").MinValueAction<number, 1, undefined>]>;
		readonly url: import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").UrlAction<string, undefined>]>;
		readonly meta: import("valibot").OptionalSchema<import("valibot").UnionSchema<[import("valibot").AnySchema, ArraySchema<import("valibot").NeverSchema<undefined>, undefined>], undefined>, undefined>;
		readonly description: import("valibot").StringSchema<undefined>;
		readonly slug: import("valibot").StringSchema<undefined>;
		readonly _links: import("valibot").ObjectSchema<{
			readonly self: ArraySchema<import("valibot").ObjectSchema<{
				readonly embeddable: import("valibot").OptionalSchema<import("valibot").BooleanSchema<undefined>, undefined>;
				readonly href: import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").UrlAction<string, undefined>]>;
				readonly templated: import("valibot").OptionalSchema<import("valibot").BooleanSchema<undefined>, undefined>;
				readonly type: import("valibot").OptionalSchema<import("valibot").StringSchema<undefined>, undefined>;
			}, undefined>, undefined>;
			readonly collection: ArraySchema<import("valibot").ObjectSchema<{
				readonly embeddable: import("valibot").OptionalSchema<import("valibot").BooleanSchema<undefined>, undefined>;
				readonly href: import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").UrlAction<string, undefined>]>;
				readonly templated: import("valibot").OptionalSchema<import("valibot").BooleanSchema<undefined>, undefined>;
				readonly type: import("valibot").OptionalSchema<import("valibot").StringSchema<undefined>, undefined>;
			}, undefined>, undefined>;
		}, undefined>;
		readonly avatar_urls: import("valibot").RecordSchema<import("valibot").StringSchema<undefined>, import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").UrlAction<string, undefined>]>, undefined>;
		readonly capabilities: import("valibot").RecordSchema<import("valibot").StringSchema<undefined>, import("valibot").BooleanSchema<undefined>, undefined>;
		readonly email: import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").EmailAction<string, undefined>]>;
		readonly extra_capabilities: import("valibot").RecordSchema<import("valibot").StringSchema<undefined>, import("valibot").BooleanSchema<undefined>, undefined>;
		readonly first_name: import("valibot").StringSchema<undefined>;
		readonly last_name: import("valibot").StringSchema<undefined>;
		readonly link: import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").UrlAction<string, undefined>]>;
		readonly locale: import("valibot").StringSchema<undefined>;
		readonly nickname: import("valibot").StringSchema<undefined>;
		readonly registered_date: import("valibot").RecordSchema<import("valibot").StringSchema<undefined>, import("valibot").BooleanSchema<undefined>, undefined>;
		readonly roles: ArraySchema<import("valibot").StringSchema<undefined>, undefined>;
		readonly username: import("valibot").StringSchema<undefined>;
	}, undefined>;
	export type WP_User_Embed = InferOutput<typeof UserEmbedSchema>;
	export type WP_User = InferOutput<typeof UserViewSchema>;
	export type WP_User_Edit = InferOutput<typeof UserEditSchema>;
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
	import type { GenericSchema, InferOutput } from 'valibot';
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
	 * @return {ReturnType<import('../../types.ts').Handle_Response<InferOutput<T>>>} Parsed data.
	 */
	export function fetch_and_parse<T extends GenericSchema>(schema: T, fetcher: () => ReturnType<typeof fetch>): ReturnType<Handle_Response<InferOutput<T>>>;
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
	export function fetch_data(endpoint: string | URL, auth?: string | undefined, args?: object | undefined): ReturnType<typeof fetch>;
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
	 * @throws {Error|ValiError|WP_REST_Error} JSON.parse error, Valibot error or WP API error.
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
	export function normalize_fetch_args(args: object): [string, string][];
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