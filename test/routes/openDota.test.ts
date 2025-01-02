import { server } from '../../src/server' // Adjust the path to your server
import request from 'supertest'

afterAll(() => {
  server.close() // Close the server after tests are done
})

describe('Heroes API', () => {
  it('should return a 200 status and an array of heroes on GET /heroes', async () => {
    const response = await request(server).get('/heroes')
    expect(response.status).toBe(200)
    expect(Array.isArray(response.body)).toBe(true) // Verify the response is an array
    if (response.body.length > 0) {
      const hero = response.body[0]
      expect(hero).toHaveProperty('id')
      expect(hero).toHaveProperty('name')
      expect(hero).toHaveProperty('localized_name')
      expect(hero).toHaveProperty('primary_attr')
      expect(hero).toHaveProperty('attack_type')
      expect(hero).toHaveProperty('roles')
      expect(Array.isArray(hero.roles)).toBe(true) // Ensure roles is an array
    }
  })

  it('should handle errors gracefully if the Dota API is down', async () => {
    // Temporarily override the base URL to simulate an error
    const originalBaseUrl = process.env.DOTA_API_BASE_URL
    process.env.DOTA_API_BASE_URL = 'http://invalid-url'

    const response = await request(server).get('/heroes')
    expect(response.status).toBe(500) // Expect a server error

    // Restore the original base URL
    process.env.DOTA_API_BASE_URL = originalBaseUrl
  })
})
