export interface IPaginationMeta {
    count: number;
    next?: number;
}

export interface IApiResponse<T> {
    resource: T[];
    meta?: IPaginationMeta;
}

export interface IApiError {
    error: {
        code: string;
        message: string;
    };
}
