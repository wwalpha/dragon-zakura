export interface ErrorPayload {
  error: Error;
}

export interface APIClass {
  get<T = any>(path: string, headers?: any): Promise<T>;
  put<T = any>(path: string, body?: any): Promise<T>;
  post<T = any>(path: string, body?: any): Promise<T>;
}

export type GET_ACTION<T = any> = (path: string, headers?: any) => Promise<T>;
export type PUT_ACTION<T = any> = (path: string, body?: any) => Promise<T>;
export type POST_ACTION<T = any> = (path: string, body?: any) => Promise<T>;
