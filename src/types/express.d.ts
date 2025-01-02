// src/types/express.d.ts
import { SteamProfile } from '../models/SteamProfile' // Import your SteamProfile type

declare global {
  namespace Express {
    interface Request {
      user?: SteamProfile | null // Tell TypeScript that req.user is of type SteamProfile
    }
  }
}
