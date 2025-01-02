"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("../auth/passport")); // Import configured passport
const router = express_1.default.Router();
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
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}
/**
 * @swagger
 * /:
 *   get:
 *     summary: Home page
 *     description: Returns a simple home page message.
 *     responses:
 *       200:
 *         description: Home page displayed
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "Home page"
 */
router.get('/', (req, res) => {
    res.send('Home page');
});
/**
 * @swagger
 * /account:
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
router.get('/account', ensureAuthenticated, (req, res) => {
    // Render account page with user profile
    res.send(`User Profile: ${JSON.stringify(req.user)}`);
});
/**
 * @swagger
 * /logout:
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
router.get('/logout', (req, res) => {
    req.logout((err) => {
        res.redirect('/');
    });
});
/**
 * @swagger
 * /auth:
 *   get:
 *     summary: Steam Authentication
 *     description: Initiates Steam authentication via Passport.js.
 *     responses:
 *       302:
 *         description: Redirects to Steam for authentication
 */
router.get('/auth', passport_1.default.authenticate('steam', { failureRedirect: '/' }), (req, res) => {
    res.redirect('/');
});
/**
 * @swagger
 * /auth/return:
 *   get:
 *     summary: Steam Authentication Return
 *     description: Handles the return from Steam after authentication.
 *     responses:
 *       302:
 *         description: Redirects to home page after successful authentication
 */
router.get('/auth/return', passport_1.default.authenticate('steam', { failureRedirect: '/' }), (req, res) => {
    res.redirect('/');
});
exports.default = router;
//# sourceMappingURL=steamRoutes.js.map