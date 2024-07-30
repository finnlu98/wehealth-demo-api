import { config } from "dotenv";

// Load environment variables from .env file
config();

// Export the environment variables for use in other parts of the application
export const API_URL = process.env.TEST_API_URL || "";
export const HEADER_REQUEST = process.env.HEADER_REQUEST || "";

export const DB_LOC_PASSWORD = process.env.DB_LOC_PASSWORD || "";
export const DB_DEV_PASSWORD = process.env.DB_LOC_PASSWORD || "";
