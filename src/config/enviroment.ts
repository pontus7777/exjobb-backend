import dotenv from 'dotenv'

// Load environment variables once
dotenv.config()

// Export the variables for reuse
export const CONFIG = {
  PORT: process.env.PORT || 5000,
  SESSION_SECRET: process.env.SESSION_SECRET || 'default-secret',
  DOTA_API_BASE_URL: process.env.DOTA_API_BASE_URL || 'https://api.opendota.com/api/',
}
