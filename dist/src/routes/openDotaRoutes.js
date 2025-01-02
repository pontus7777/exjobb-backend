"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const enviroment_1 = require("../config/enviroment");
const router = express_1.default.Router();
// Base URL for the Dota API (read from environment variables)
const baseUrl = enviroment_1.CONFIG.DOTA_API_BASE_URL;
// Route to fetch heroes
router.get('/heroes', async (req, res, next) => {
    try {
        // Fetch data from the external API
        const response = await axios_1.default.get(`${baseUrl}/heroes`);
        const heroes = response.data; // Ensure the data conforms to the Hero interface
        res.status(200).json(heroes); // Respond with the heroes data
    }
    catch (error) {
        console.error('Error fetching heroes:', error);
        next(error); // Pass the error to the next middleware
    }
});
exports.default = router;
//# sourceMappingURL=openDotaRoutes.js.map