export interface AsyncState<T> {
    isLoading: boolean;
    result: boolean;
    message: string;
    code: number;
    data: T;
}
