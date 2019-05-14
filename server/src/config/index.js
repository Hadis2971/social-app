import dotenv from 'dotenv';

dotenv.config();

export const port = process.env.PORT;

export const dbConfig = {
  dbName: process.env.DB_NAME,
  dbUser: process.env.DB_USER,
  dbHost: process.env.DB_HOST,
  dbPassword: process.env.DB_PASSWORD
};

export const secretOrKey = process.env.AUTH_SECRET;
export const secretOrKeyRefreshToken = process.env.REFRESH_AUTH_SECRET;
export const secretForResetPassword = process.env.RESER_PASSWORD_SECRET;

export const emailService = process.env.EMAIL_SERVICE_PROVIDER;
export const serverEmail = process.env.SERVER_EMAIL;
export const emailPassword = process.env.EMAIL_PASSWORD;
