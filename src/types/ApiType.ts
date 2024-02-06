export interface ApiResponse<T> {
    result: boolean;
    message: string;
    data: T;
    code: number;
}

export interface DataList<T> {
    datas: T[];
    totalItem: number;
    totalPage: number;
    page: number;
}
