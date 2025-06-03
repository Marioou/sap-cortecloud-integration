import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

export class CorteCloudAuthService {
    private static instance: CorteCloudAuthService;
    private authHeader: string;
    private baseUrl: string;

    private constructor() {
        // Configuración base de la API
        this.baseUrl = process.env.CORTECLOUD_API_URL || 'https://apis.ccstg.com.br';
        
        // Generación del header de autenticación Basic
        const credentials = `${process.env.CORTECLOUD_EMAIL}:${process.env.CORTECLOUD_PASSWORD}`;
        this.authHeader = `Basic ${Buffer.from(credentials).toString('base64')}`;
    }

    public static getInstance(): CorteCloudAuthService {
        if (!CorteCloudAuthService.instance) {
            CorteCloudAuthService.instance = new CorteCloudAuthService();
        }
        return CorteCloudAuthService.instance;
    }

    public getHeaders() {
        return {
            'accept': 'application/json',
            'authorization': this.authHeader,
            'x-dreamfactory-api-key': process.env.CORTECLOUD_CLIENT_API_KEY,
            'content-type': 'application/json'
        };
    }

    public getBaseUrl(): string {
        return this.baseUrl;
    }
}
