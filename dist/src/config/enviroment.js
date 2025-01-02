"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CONFIG = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables once
dotenv_1.default.config();
// Export the variables for reuse
exports.CONFIG = {
    PORT: process.env.PORT || 5001,
    SESSION_SECRET: process.env.SESSION_SECRET || 'default-secret',
    DOTA_API_BASE_URL: process.env.DOTA_API_BASE_URL || 'undefined',
};
//# sourceMappingURL=enviroment.js.map