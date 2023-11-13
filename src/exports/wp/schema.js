import { z } from 'zod';

export const jwt_login_data = z.object( {
	user_email: z.string().email(),
	user_display_name: z.string(),
	user_nicename: z.string(),
	token: z.string(),
} );

/** @typedef {z.infer<jwt_login_data>} JWT_Login_Data */
