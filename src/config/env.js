import dotenvflow from "dotenv-flow";
dotenvflow.config();

export const { NODE_ENV, PORT, DB_URI, API_PREFIX, API_VERSION, BASE_URL } =
  process.env;

console.log(`Running ${NODE_ENV} on port ${PORT}`);
