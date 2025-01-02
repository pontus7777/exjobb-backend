"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// auth/passport.ts
const passport_1 = __importDefault(require("passport"));
const passport_steam_1 = require("passport-steam");
passport_1.default.serializeUser((user, done) => {
    done(null, user); // Store the User object in the session
});
passport_1.default.deserializeUser((obj, done) => {
    done(null, obj); // Retrieve the User object from the session
});
passport_1.default.use(new passport_steam_1.Strategy({
    returnURL: process.env.STEAM_RETURN_URL || 'http://localhost:5000/api/v1/steam/auth/return',
    realm: process.env.STEAM_REALM || 'http://localhost:5000/',
    apiKey: process.env.STEAM_API_KEY || 'Steam-Api-Key not working',
}, function (identifier, profile, done) {
    const user = {
        steamId: profile.id,
        displayName: profile.displayName,
        avatar: profile.photos[0]?.value || '',
        profileUrl: profile.profileUrl,
    };
    return done(null, user); // Return the user object
}));
exports.default = passport_1.default;
//# sourceMappingURL=passport.js.map