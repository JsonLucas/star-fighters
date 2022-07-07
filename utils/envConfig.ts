import 'dotenv/config';

export const port: number = Number(process.env.PORT) || 5000;
export const connection = process.env.DATABASE_URL; 