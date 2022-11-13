export type Response<T> = ApiDataResponse<T> | ApiErrorResponse;

export interface ApiDataResponse<T> {
  data: T;
}

export interface ApiErrorResponse {
  errors: ApiError[];
}

export interface ApiError {
  code: string;
  message: string;
  debug?: string;
}
