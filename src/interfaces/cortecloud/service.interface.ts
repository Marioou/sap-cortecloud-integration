import { IBoard, IEdge, IComponent } from './materials.interface';
import { IPaginationMeta } from './api.interface';

export interface IServiceStatus {
    code: number;
    created_date: string;
    budgeted_date: string;
    purchased_date: string;
    authorized_date?: string;
    finished_date?: string;
    status_description?: string;
    production_status?: string;
    production_status_code?: number;
}

export interface IServiceBase {
    id: number;
    internal_code: string | null;
    status: IServiceStatus;
}

export interface IServiceList extends IServiceBase {
    // Campos específicos del listado
    created_by?: string;
    updated_by?: string;
    created_date: string;
    updated_date: string;
    total_price?: number;
    payment_status?: string;
    payment_method?: string;
}

export interface IServiceLabour {
    cutting: {
        price: number;
        quantity: number;
    };
    edging: {
        price: number;
        quantity: number;
    };
    machining: {
        price: number;
        resume: {
            drills: Array<{
                diameter: number;
                quantity: number;
                depth?: number;
                face?: string;
                position_x?: number;
                position_y?: number;
            }>;
            rip: Array<{
                thickness: number;
                quantity: number;
                depth?: number;
                face?: string;
                start_x?: number;
                start_y?: number;
                end_x?: number;
                end_y?: number;
            }>;
            filister: Array<{
                width: number;
                depth: number;
                length: number;
                face: string;
            }>;
        };
        total_drills?: number;
        total_rips?: number;
        total_filisters?: number;
    };
    assembly?: {
        price: number;
        time?: number;
    };
    packing: {
        price: number;
    };
    delivery: {
        price: number;
    };
}

export interface IServiceMaterials {
    boards: Array<{
        internal_code: string;
        price: number;
        quantity: number;
        details?: Partial<IBoard>;
        cut_optimization?: {
            waste_percentage: number;
            total_pieces: number;
            total_area: number;
        };
        piece_details?: Array<{
            name: string;
            width: number;
            height: number;
            quantity: number;
            edge_details?: {
                top?: string;
                bottom?: string;
                left?: string;
                right?: string;
            };
        }>;
    }>;
    edges: Array<{
        internal_code: string;
        price: number;
        quantity: number;
        unit: number;
        applied: number;
        details?: Partial<IEdge>;
    }>;
    components: Array<{
        internal_code: string;
        price: number;
        quantity: number;
        details?: Partial<IComponent>;
    }>;
}

export interface IServiceDetail extends IServiceBase {
    observation: string | null;
    client: {
        internal_code: string;
    };
    labour: IServiceLabour;
    materials: IServiceMaterials;
    additional_info?: {
        delivery_address?: string;
        delivery_date?: string;
        custom_fields?: Record<string, any>;
    };
    pricing_summary?: {
        subtotal: number;
        tax: number;
        discount?: number;
        total: number;
    };
    production?: {
        started_date?: string;
        estimated_completion?: string;
        actual_completion?: string;
        notes?: string[];
    };
}

export interface IServiceListResponse {
    resource: IServiceList[];
    meta: IPaginationMeta;
}

export interface IServiceUpdateRequest {
    internal_code: string;
}
