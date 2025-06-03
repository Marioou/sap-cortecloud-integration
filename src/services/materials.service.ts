import { BaseApiService } from './cortecloud/base.service';
import { IBoardResponse, IEdgeResponse, IComponentResponse } from '../interfaces/cortecloud/materials.interface';

export class MaterialsService extends BaseApiService {
    async getBoards(): Promise<IBoardResponse> {
        const response = await this.apiClient.get('/materials/boards');
        return response.data;
    }

    async updateBoardsPrices(updates: Array<{ internal_code: string; price: number; stock: number }>) {
        const response = await this.apiClient.put('/materials/boards', { resource: updates });
        return response.data;
    }

    // Implementar otros endpoints según necesidad
}
