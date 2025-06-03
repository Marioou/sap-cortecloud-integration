import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const API_URL = process.env.CORTECLOUD_API_URL;
const headers = {
    'accept': 'application/json',
    'authorization': `Basic ${Buffer.from(`${process.env.CORTECLOUD_EMAIL}:${process.env.CORTECLOUD_PASSWORD}`).toString('base64')}`,
    'x-dreamfactory-api-key': process.env.CORTECLOUD_CLIENT_API_KEY,
    'content-type': 'application/json'
};

describe('CorteCloud Services API', () => {
    test('GET /services - List all services', async () => {
        const response = await axios.get(
            `${API_URL}/services?status=6&limit=100&offset=0`,
            { headers }
        );
        expect(response.status).toBe(200);
    });

    test('GET /services/:id - Get specific service', async () => {
        const serviceId = 1101; // Example ID
        const response = await axios.get(
            `${API_URL}/services/${serviceId}`,
            { headers }
        );
        expect(response.status).toBe(200);
    });

    test('PUT /services/:id - Update service internal_code', async () => {
        const serviceId = 1101;
        const response = await axios.put(
            `${API_URL}/services/${serviceId}`,
            { internal_code: "12345" },
            { headers }
        );
        expect(response.status).toBe(200);
    });
});
