export type ApiSuccessResponse<T> = {
  success: true;
  data: T;
  message?: string;
}

export type ApiErrorResponse = {
  success: false;
  error: string;
  message?: string;
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

export * from './blog';
export * from './project'
