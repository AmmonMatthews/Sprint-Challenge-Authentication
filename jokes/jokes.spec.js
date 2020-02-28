const request = require('supertest');
const server = require('../api/server.js');


describe("jokes router", () => {
    it("GET/ returns 200 status", async () => {
        const statusCode = 200
        const response = await request(server).get('/api/jokes');

        expect(response.status).toEqual(statusCode)
    })
})