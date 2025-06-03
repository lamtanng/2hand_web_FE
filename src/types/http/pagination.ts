/* eslint-disable @typescript-eslint/no-explicit-any */
export interface PaginationRequestProps {
    page?: number;
    limit?: number;
    search?: string;
  }
  export interface PaginationResponseProps<T> {
    page: number;
    limit: number;
    total: number;
    data: T[];
  }