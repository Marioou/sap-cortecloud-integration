import axios, { AxiosInstance, AxiosError } from 'axios';
import { CorteCloudAuthService } from './auth.service';

export class MaterialsService {
    private apiClient: AxiosInstance;
    private authService: CorteCloudAuthService;

    constructor() {
        this.authService = CorteCloudAuthService.getInstance();
        this.apiClient = axios.create({
            baseURL: '/api',
            headers: this.authService.getHeaders()
        });
    }

    async getBoards() {
        try {
            const response = await this.apiClient.get('/materials/boards');
            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    }

    async getBoardDetail(internalCode: string) {
        try {
            const response = await this.apiClient.get(`/materials/boards/${internalCode}`);
            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    }

    async getEdges() {
        try {
            const response = await this.apiClient.get('/materials/edges');
            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    }

    async getComponents() {
        try {
            const response = await this.apiClient.get('/materials/components');
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
