import passport from 'passport'
import { Strategy as SteamStrategy } from 'passport-steam'
import dotenv from 'dotenv'
import { profile } from 'console'
import { SteamProfile } from '../models/SteamProfile'

dotenv.config()

passport.serializeUser((user: any, done) => {
  done(null, user) // Store the User object in the session
})

passport.deserializeUser((obj: SteamProfile, done) => {
  done(null, obj) // Retrieve the User object from the session
})

passport.use(
  new SteamStrategy(
    {
      returnURL: process.env.STEAM_RETURN_URL || 'http://localhost:5173/players/',
      realm: process.env.STEAM_REALM || 'http://localhost:5173/',
      apiKey: process.env.STEAM_API_KEY || 'Steam-Api-Key not working',
    },
    function (
      identifier: string,
      profile: any,
      done: (err: any, user: SteamProfile | null) => void
    ) {
      const user: SteamProfile = {
        steamId: profile.id,
        displayName: profile.displayName,
        avatar: profile.photos[0]?.value || '',
        profileUrl: profile.profileUrl,
      }
      return done(null, user) // Return the SteamProfile object
    }
  )
)

export default passport
