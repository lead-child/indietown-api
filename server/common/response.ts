export type Response<T> = ApiDataResponse<T> | ApiErrorResponse;

export interface ApiDataResponse<T> {
  data: T;
}

export interface ApiErrorResponse {
  code: string;
  message: string;
  debug?: string;
}
