import { z } from 'zod';

export const jwt_auth_data = z.object( {
	user_email: z.string().email(),
	user_display_name: z.string(),
	user_nicename: z.string(),
	token: z.string(),
} );

/** @typedef {z.infer<jwt_auth_data>} JWT_Auth_Data */

export const rest_error = z.object( {
	code: z.string(),
	message: z.string(),
	data: z.object( {
		status: z.number(),
	} ),
} );

/** @typedef {z.infer<rest_error>} WP_Rest_Error */
