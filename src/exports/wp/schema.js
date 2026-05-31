/** @import {InferOutput} from "valibot" */

import {
	any,
	array,
	boolean,
	email,
	minValue,
	never,
	number,
	object,
	optional,
	picklist,
	pipe,
	string,
	toDate,
	union,
	url,
} from 'valibot';

export const CommentStatusSchema = picklist( [ 'open', 'closed' ] );
export const DateItemSchema = pipe( string(), toDate() );
export const EmailSchema = pipe( string(), email() );
export const IdSchema = pipe( number(), minValue( 1 ) );
export const UrlSchema = pipe( string(), url() );

export const LinkItemSchema = array(
	object( {
		embeddable: optional( boolean() ),
		href: UrlSchema,
		templated: optional( boolean() ),
		type: optional( string() ),
	} ),
);

/** @typedef {InferOutput<typeof MetaSchema>} Meta */
export const MetaSchema = optional( union( [
	any(),
	// When meta is an array it shouldn't have any value, hence the never type.
	array( never() ),
] ) );

export const RenderableItemSchema = object( {
	block_version: optional( number() ),
	protected: optional( boolean() ),
	raw: optional( string() ),
	rendered: string(),
} );

/** @typedef {InferOutput<typeof RestErrorSchema>} RestError */
export const RestErrorSchema = object( {
	code: string(),
	message: string(),
	data: object( {
		status: number(),
	} ),
} );
