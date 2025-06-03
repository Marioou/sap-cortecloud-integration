import axios, { AxiosInstance, AxiosError } from 'axios';
import { CorteCloudAuthService } from './auth.service';

export class ServiceService {
    private apiClient: AxiosInstance;
    private authService: CorteCloudAuthService;

    constructor() {
        this.authService = CorteCloudAuthService.getInstance();
        this.apiClient = axios.create({
            baseURL: '/api', // Cambiado para usar el proxy
            headers: this.authService.getHeaders()
        });
    }

    async getServices(params?: {
        status?: number;
        limit?: number;
        offset?: number;
    }) {
        try {
            const response = await this.apiClient.get('/services', { params });
            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    }

    async getServiceDetail(id: number) {
        try {
            const response = await this.apiClient.get(`/services/${id}`);
            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    }

    private handleError(error: any) {
        if (error instanceof AxiosError) {
            throw new Error(`API Error: ${error.response?.data?.error?.message || error.message}`);
        }
        throw error;
    }
}
