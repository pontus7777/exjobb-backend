"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("../../src/server"); // Adjust the path to your server
const supertest_1 = __importDefault(require("supertest"));
afterAll(() => {
    server_1.server.close(); // Close the server after tests are done
});
describe('Heroes API', () => {
    it('should return a 200 status and an array of heroes on GET /heroes', async () => {
        const response = await (0, supertest_1.default)(server_1.server).get('/heroes');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true); // Verify the response is an array
        if (response.body.length > 0) {
            const hero = response.body[0];
            expect(hero).toHaveProperty('id');
            expect(hero).toHaveProperty('name');
            expect(hero).toHaveProperty('localized_name');
            expect(hero).toHaveProperty('primary_attr');
            expect(hero).toHaveProperty('attack_type');
            expect(hero).toHaveProperty('roles');
            expect(Array.isArray(hero.roles)).toBe(true); // Ensure roles is an array
        }
    });
    it('should handle errors gracefully if the Dota API is down', async () => {
        // Temporarily override the base URL to simulate an error
        const originalBaseUrl = process.env.DOTA_API_BASE_URL;
        process.env.DOTA_API_BASE_URL = 'http://invalid-url';
        const response = await (0, supertest_1.default)(server_1.server).get('/heroes');
        expect(response.status).toBe(500); // Expect a server error
        // Restore the original base URL
        process.env.DOTA_API_BASE_URL = originalBaseUrl;
    });
});
//# sourceMappingURL=openDota.test.js.map