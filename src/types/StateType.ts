export interface AsyncState<T> {
    isLoading: boolean;
    isSuccess: boolean;
    message: string;
    data: T | null;
}
