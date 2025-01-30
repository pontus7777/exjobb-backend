import express, { Request, Response, NextFunction } from 'express'
import passport from '../auth/passport' // Import configured passport
import type { SteamProfile } from '../models/SteamProfile'

const router = express.Router()

// Protect routes with ensureAuthenticated middleware
/**
 * @swagger
 * components:
 *   securitySchemes:
 *     cookieAuth:
 *       type: apiKey
 *       in: cookie
 *       name: connect.sid
 */
function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect('http://localhost:5173')
}

/**
 * @swagger
 * /api/v1/steam/:
 *   get:
 *     summary: Home page
 *     description: Returns a simple health check message and API docs link.
 *     responses:
 *       200:
 *         description: Health check message displayed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "Server is running"
 *                 docs:
 *                   type: string
 *                   example: "http://localhost:5001/api-docs"
 */
router.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'Server is running',
    docs: 'http://localhost:5001/api-docs',
  })
})

/**
 * @swagger
 * /api/v1/steam/account:
 *   get:
 *     summary: User account information
 *     description: Returns the profile information of the authenticated user.
 *     security:
 *       - cookieAuth: []  # Using session authentication via cookies
 *     responses:
 *       200:
 *         description: Returns user profile details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: User's Steam ID
 *                 displayName:
 *                   type: string
 *                   description: User's Steam display name
 *                 photos:
 *                   type: array
 *                   items:
 *                     type: string
 *                     description: User's profile photo URL(s)
 *       401:
 *         description: Unauthorized if the user is not authenticated
 */
router.get('/account', ensureAuthenticated, (req: Request, res: Response) => {
  // Cast req.user to SteamProfile type
  const user = req.user as SteamProfile
  if (user) {
    res.json({
      steamId: user.steamId,
      displayName: user.displayName,
      avatar: user.avatar,
      profileURL: user.profileUrl,
    })
  } else {
    res.status(401).json({ error: 'Not authenticated' })
  }
})

/**
 * @swagger
 * /api/v1/steam/logout:
 *   get:
 *     summary: Logout user
 *     description: Logs the user out and redirects to the home page.
 *     responses:
 *       200:
 *         description: User successfully logged out
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "Redirected to home page"
 */
router.get('/logout', (req: Request, res: Response) => {
  req.logout((err) => {
    res.redirect('http://localhost:5173')
  })
})

/**
 * @swagger
 * /api/v1/steam/auth:
 *   get:
 *     summary: Steam Authentication
 *     description: Initiates Steam authentication via Passport.js.
 *     responses:
 *       302:
 *         description: Redirects to Steam for authentication
 */
router.get(
  '/auth',
  passport.authenticate('steam', { failureRedirect: 'http://localhost:5173' }),
  (req: Request, res: Response) => {
    res.redirect('http://localhost:5173')
  }
)



/**
 * @swagger
 * /api/v1/steam/auth/return:
 *   get:
 *     summary: Steam Authentication Return
 *     description: Handles the return from Steam after authentication.
 *     responses:
 *       302:
 *         description: Redirects to home page after successful authentication
 */
router.get(
  '/auth/return',
  passport.authenticate('steam', { failureRedirect: '/' }),
  (req: Request, res: Response) => {
    // After successful authentication, redirect to your frontend
    res.redirect('http://localhost:5173') // Redirect to your frontend app
  }
)

export default router
