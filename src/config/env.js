import dotenvFlow from "dotenv-flow";
dotenvFlow.config({ override: true }); // , debug: true

export const NODE_ENV = process.env.NODE_ENV;
export const PORT = process.env.PORT;
export const DB_URI = process.env.DB_URI;
export const API_PREFIX = process.env.API_PREFIX;
export const API_VERSION = process.env.API_VERSION;
export const BASE_URL = process.env.BASE_URL;
export const JWT_SECRET = process.env.JWT_SECRET;

console.log(`Running ${NODE_ENV} on port ${PORT}`);
