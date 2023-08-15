export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
    errCode: string;
}

export interface DataList<T> {
    items: T;
    totalRecords: number;
}
