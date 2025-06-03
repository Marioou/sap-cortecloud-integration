import axios, { AxiosInstance, AxiosError } from 'axios';
import { EncryptionUtil } from '../../utils/encryption.util';
import logger from '../../utils/logger.util';
import { CorteCloudAuthService } from './auth.service';
import { randomUUID } from 'crypto';
import { ICorteCloudError } from '../../interfaces/api.interface';

export abstract class BaseApiService {
    protected apiClient: AxiosInstance;
    protected authService: CorteCloudAuthService;

    constructor() {
        this.authService = CorteCloudAuthService.getInstance();
        this.apiClient = axios.create({
            baseURL: this.authService.getBaseUrl(),
            headers: this.authService.getHeaders(),
            timeout: 10000 // 10 segundos
        });

        this.setupInterceptors();
    }

    private setupInterceptors(): void {
        this.apiClient.interceptors.request.use(
            (config) => {
                const requestId = randomUUID();
                logger.info({
                    message: 'API Request',
                    requestId,
                    method: config.method,
                    url: config.url
                });
                return config;
            },
            (error) => {
                logger.error('Request Error:', error);
                return Promise.reject(error);
            }
        );

        this.apiClient.interceptors.response.use(
            (response) => {
                logger.debug('API Response:', {
                    status: response.status,
                    url: response.config.url
                });
                return response;
            },
            (error) => {
                this.handleApiError(error);
                return Promise.reject(error);
            }
        );
    }

    protected handleApiError(error: AxiosError<ICorteCloudError>): never {
        logger.error('API Error:', {
            message: error.message,
            status: error.response?.status,
            data: error.response?.data
        });

        const errorMessage = error.response?.data?.error?.message || error.message;
        throw new Error(`API Error: ${errorMessage}`);
    }

    protected encryptSensitiveData(data: any): any {
        // Implementar lógica de encriptación para datos sensibles
        return data;
    }
}
