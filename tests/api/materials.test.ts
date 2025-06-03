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

describe('CorteCloud Materials API', () => {
    // Boards Tests
    test('GET /materials/boards - List all boards', async () => {
        const response = await axios.get(
            `${API_URL}/materials/boards`,
            { headers }
        );
        expect(response.status).toBe(200);
    });

    test('GET /materials/boards/:code - Get specific board', async () => {
        const boardCode = "12345c";
        const response = await axios.get(
            `${API_URL}/materials/boards/${boardCode}`,
            { headers }
        );
        expect(response.status).toBe(200);
    });

    test('PUT /materials/boards/:code - Update single board', async () => {
        const boardCode = "12345c";
        const response = await axios.put(
            `${API_URL}/materials/boards/${boardCode}`,
            {
                price: 237.89,
                stock: 12,
                unit: 1,
                active: true
            },
            { headers }
        );
        expect(response.status).toBe(200);
    });

    test('PUT /materials/boards - Update multiple boards', async () => {
        const response = await axios.put(
            `${API_URL}/materials/boards`,
            {
                resource: [
                    {
                        internal_code: "59",
                        price: 237.89,
                        stock: 127,
                        unit: 500,
                        active: true
                    },
                    {
                        internal_code: "555",
                        price: 360,
                        stock: 350,
                        unit: 1,
                        active: true
                    }
                ]
            },
            { headers }
        );
        expect(response.status).toBe(200);
    });

    // Similar tests for edges and components...
});
