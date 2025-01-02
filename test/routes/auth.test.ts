import { server } from '../../src/server' // Adjust based on your server setup
import request from 'supertest'
import app from '../../src/server'

afterAll(() => {
  server.close() // Close the server after tests are done
})

describe('Auth Routes', () => {
  it('should return 200 OK on /api/v1/steam/auth', async () => {
    const response = await request(app).get('/api/v1/steam/auth')
    expect(response.status).toBe(200)
  })

  it('should return 302 for /api/v1/steam/auth', async () => {
    const response = await request(app).get('/api/v1/steam/auth')
    expect(response.status).toBe(302) // Redirect
  })

  it('should return 401 for unauthenticated /api/v1/steam/account', async () => {
    const response = await request(app).get('/api/v1/steam/account')
    expect(response.status).toBe(401) // Unauthorized
  })

  it('should return user profile when authenticated', async () => {
    const response = await request(app)
      .get('/api/v1/steam/account')
      .set('cookie', 'connect.sid=test-session-cookie')
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('id')
  })
})
