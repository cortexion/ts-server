import request from 'supertest';
import app from '../src/index';
import { stopServer } from '../src/index';

afterAll(async () => {
  await stopServer(); // Wait for the server to close before finishing the tests
});

describe('Express Server', () => {
  it('should respond with a JSON message', async () => {
    const response = await request(app).get('/');
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Hello World!!!');
  });

  it('should include client IP address in the response', async () => {
    const response = await request(app).get('/');
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('clientIp');
  });
});
