import supertest from 'supertest';
import app from './app';
import dotenv from 'dotenv';

dotenv.config();


describe('GET /popularity', () => {
    describe('when repoName query is valid repo/user', () => {
        it('should return 200', async () => {
            const response = await supertest(app).get('/popularity?repoName=facebook/react');
            expect(response.status).toBe(200);
        });
    })

    describe('when repoName query is invalid repo/user', () => {
        it('should return 404', async () => {
            const response = await supertest(app).get('/popularity?repoName=noname/noname');
            expect(response.status).toBe(404);
        });
    })

    describe('when repoName query is missing', () => {
        it('should return 400', async () => {
            const response = await supertest(app).get('/popularity');
            expect(response.status).toBe(400);
        });
    })
});