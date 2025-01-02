"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.steamReturn = exports.steamAuth = void 0;
const passport_1 = __importDefault(require("passport"));
// Steam authentication controller
const steamAuth = (req, res) => {
    passport_1.default.authenticate("steam", { failureRedirect: "/" })(req, res);
};
exports.steamAuth = steamAuth;
// Steam return controller
const steamReturn = (req, res) => {
    passport_1.default.authenticate("steam", { failureRedirect: "/" })(req, res, () => {
        res.send("You are logged in with Steam!");
    });
};
exports.steamReturn = steamReturn;
//# sourceMappingURL=steamController.js.map