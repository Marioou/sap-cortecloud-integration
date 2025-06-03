export interface BoardMaterial {
    internal_code: string;
    active: boolean;
    price: number;
    stock: number;
    unit?: number;
}

export interface ServiceStatus {
    code: number;
    created_date: string;
    budgeted_date: string;
    purchased_date: string;
    authorized_date?: string;
    finished_date?: string;
}

export interface Service {
    id: number;
    internal_code: string | null;
    observation?: string;
    status: ServiceStatus;
    client?: {
        internal_code: string;
    };
    labour?: any;
    materials?: any;
}
