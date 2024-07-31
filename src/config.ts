import { config } from "dotenv";

// Load environment variables from .env file
config();

// MET API
export const API_URL = process.env.TEST_API_URL || "";
export const HEADER_REQUEST = process.env.HEADER_REQUEST || "";

// LOC DB
export const DB_LOC_DATABASE_NAME = process.env.DB_LOC_DATABASE_NAME || "";
export const DB_LOC_USERNAME = process.env.DB_LOC_USERNAME || "";
export const DB_LOC_PASSWORD = process.env.DB_LOC_PASSWORD || "";
export const DB_LOC_PORT = process.env.DB_LOC_PORT || 0;

// DEV DB
export const DB_DEV_DATABASE_NAME = process.env.DB_DEV_DATABASE_NAME || "";
export const DB_DEV_USERNAME = process.env.DB_DEV_USERNAME || "";
export const DB_DEV_PASSWORD = process.env.DB_DEV_PASSWORD || "";
export const DB_DEV_HOST = process.env.DB_DEV_HOST || "";
export const DB_DEV_PORT = process.env.DB_DEV_PORT || 0;

// LOOP
export const REPEAT_TIME_PROCESS = process.env.REPEAT_TIME_PROCESS || "";
