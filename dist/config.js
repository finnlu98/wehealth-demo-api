import { config } from "dotenv";
// Load environment variables from .env file
config();
// Export the environment variables for use in other parts of the application
export const API_URL = process.env.TEST_API_URL || "";
export const HEADER_REQUEST = process.env.HEADER_REQUEST || "";
//# sourceMappingURL=config.js.map