"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("../../src/server"); // Adjust based on your server setup
const supertest_1 = __importDefault(require("supertest"));
const server_2 = __importDefault(require("../../src/server"));
afterAll(() => {
    server_1.server.close(); // Close the server after tests are done
});
describe('Auth Routes', () => {
    it('should return 200 OK on /api/v1/steam/auth', async () => {
        const response = await (0, supertest_1.default)(server_2.default).get('/api/v1/steam/auth');
        expect(response.status).toBe(200);
    });
    it('should return 302 for /api/v1/steam/auth', async () => {
        const response = await (0, supertest_1.default)(server_2.default).get('/api/v1/steam/auth');
        expect(response.status).toBe(302); // Redirect
    });
    it('should return 401 for unauthenticated /api/v1/steam/account', async () => {
        const response = await (0, supertest_1.default)(server_2.default).get('/api/v1/steam/account');
        expect(response.status).toBe(401); // Unauthorized
    });
    it('should return user profile when authenticated', async () => {
        const response = await (0, supertest_1.default)(server_2.default)
            .get('/api/v1/steam/account')
            .set('cookie', 'connect.sid=test-session-cookie');
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id');
    });
});
//# sourceMappingURL=auth.test.js.map