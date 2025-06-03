import { Request, Response } from 'express';
import { MaterialsService } from '../services/materials.service';
import logger from '../utils/logger.util';

export class MaterialsController {
    private materialsService: MaterialsService;

    constructor() {
        this.materialsService = new MaterialsService();
    }

    async getBoards(req: Request, res: Response) {
        try {
            const boards = await this.materialsService.getBoards();
            res.json(boards);
        } catch (error) {
            logger.error('Error fetching boards:', error);
            res.status(500).json({ error: 'Failed to fetch boards' });
        }
    }

    async updatePrices(req: Request, res: Response) {
        try {
            const updates = req.body.updates;
            const result = await this.materialsService.updateBoardsPrices(updates);
            res.json(result);
        } catch (error) {
            logger.error('Error updating prices:', error);
            res.status(500).json({ error: 'Failed to update prices' });
        }
    }
}
