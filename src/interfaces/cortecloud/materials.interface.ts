import { IPaginationMeta } from './api.interface';

// Interfaces base para materiales
export interface IMaterialBase {
    internal_code: string;
    active: boolean;
    price: number;
    stock: number;
    unit?: number;
    sku?: string;
    description?: string;
    category?: string;
    manufacturer?: string;
    supplier?: string;
    min_stock?: number;
    max_stock?: number;
    reorder_point?: number;
    last_updated?: string;
    cost_price?: number;
    markup?: number;
    tax_rate?: number;
    barcode?: string;
    location?: string;
}

// Interfaces específicas por tipo de material
export interface IBoard extends IMaterialBase {
    width?: number;
    height?: number;
    thickness?: number;
    color?: string;
    manufacturer?: string;
    grain_direction?: 'horizontal' | 'vertical';
    material_type?: string;
    surface_finish?: string;
    weight_per_unit?: number;
    minimum_cut_size?: {
        width: number;
        height: number;
    };
    edge_banding_available?: boolean;
    certification?: string[];
}

export interface IEdge extends IMaterialBase {
    width?: number;
    thickness?: number;
    color?: string;
    roll_length?: number;  // longitud del rollo en metros
    material_type?: string;
    adhesive_type?: string;
    minimum_length?: number;
    finish_type?: string;
    pattern?: string;
    matching_board_codes?: string[];
}

export interface IComponent extends IMaterialBase {
    description?: string;
    category?: string;
    manufacturer?: string;
    installation_type?: string;
    dimensions?: {
        length?: number;
        width?: number;
        height?: number;
    };
    weight?: number;
    material?: string;
    finish?: string;
    included_hardware?: string[];
    installation_instructions?: string;
    warranty_period?: string;
}

// Interfaces para respuestas de la API
export interface IBoardResponse {
    resource: IBoard[];
    meta: IPaginationMeta;
}

export interface IEdgeResponse {
    resource: IEdge[];
    meta: IPaginationMeta;
}

export interface IComponentResponse {
    resource: IComponent[];
    meta: IPaginationMeta;
}

// Interfaces para actualización de materiales
export interface IMaterialUpdateRequest {
    price: number;
    stock: number;
    unit?: number;
    active: boolean;
}

export interface IBulkMaterialUpdate {
    resource: Array<{
        internal_code: string;
    } & IMaterialUpdateRequest>;
}
