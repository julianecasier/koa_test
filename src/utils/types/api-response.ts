export interface SuccessResponse<T> {
  success: true;
  data: T;
}

export interface PaginatedSuccessResponse<T> {
  success: true;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
