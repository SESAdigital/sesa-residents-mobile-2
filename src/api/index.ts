export interface GenericApiResponse {
  status: boolean;
  message: string;
  errors?: string[];
  traceId?: string;
}

export interface GenericPaginationRequest {
  PageNumber: number;
  PageSize: number;
  SearchText?: string;
}

export interface GenericPaginationRequestWithId
  extends GenericPaginationRequest {
  id?: string;
}
export interface GenericPaginatedResponse<T> {
  records: T[];
  currentPage: number;
  currentRecordCount: number;
  totalRecordCount: number;
  totalPages: number;
}
export interface GenericTypeWithId<T> {
  value: T;
  id: number;
}
