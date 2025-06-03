import axios, { AxiosInstance } from 'axios';
import { CorteCloudAuthService } from './auth.service';
import { 
    IServiceList, 
    IServiceDetail, 
    IServiceListResponse, 
    IServiceUpdateRequest 
} from '../../interfaces/cortecloud/service.interface';
import { IApiError } from '../../interfaces/cortecloud/api.interface';

export class ServiceService {
    private apiClient: AxiosInstance;
    private authService: CorteCloudAuthService;

    constructor() {
        this.authService = CorteCloudAuthService.getInstance();
        this.apiClient = axios.create({
            baseURL: this.authService.getBaseUrl(),
            headers: this.authService.getHeaders()
        });
    }

    async getServices(params?: {
        status?: number;
        limit?: number;
        offset?: number;
        date_start?: string;
        date_end?: string;
        internal_code?: string;
    }): Promise<IServiceList[]> {
        try {
            const response = await this.apiClient.get<IServiceListResponse>('/services', { params });
            return response.data.resource;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.data) {
                throw new Error((error.response.data as IApiError).error.message);
            }
            throw error;
        }
    }

    async getServiceDetail(id: number): Promise<IServiceDetail> {
        try {
            const response = await this.apiClient.get<IServiceDetail>(`/services/${id}`);
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.data) {
                throw new Error((error.response.data as IApiError).error.message);
            }
            throw error;
        }
    }

    async updateServiceInternalCode(id: number, internalCode: string): Promise<void> {
        try {
            const data: IServiceUpdateRequest = { internal_code: internalCode };
            await this.apiClient.put(`/services/${id}`, data);
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.data) {
                throw new Error((error.response.data as IApiError).error.message);
            }
            throw error;
        }
    }

    mapServiceToSAP(service: IServiceDetail) {
        // TODO: Implementar mapeo específico a estructura SAP
        // Este método debería retornar una estructura compatible con SAP
        throw new Error('Método mapServiceToSAP no implementado');
    }
}
