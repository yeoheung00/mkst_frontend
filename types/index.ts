export type ApiSuccessResponse<T = void> = T extends void ? {
  success: true;
  message?: string;
} : {
  success: true;
  data: T;
  message?: string;
}

export type ApiErrorResponse = {
  success: false;
  error: string;
  message?: string;
}

export type ApiResponse<T = unknown> = ApiSuccessResponse<T> | ApiErrorResponse;

export * from './blog';
export * from './project'
