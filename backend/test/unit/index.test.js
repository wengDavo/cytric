import { expect } from 'chai';
import app from "../../src/index.js"
import supertest from "supertest"

const requestWithSupertest = supertest(app);

describe('Express App', () => {
	describe('GET /api/v1', function() {
		it('should respond with a message and 200 staus', async function() {
			const response = await requestWithSupertest.get('/api/v1');
			expect(response.status).to.equal(200);
			expect(response.body).to.have.property('message');
		});
	})
});

