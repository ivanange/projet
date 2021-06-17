export interface Response {
  meta: Meta;
}

export interface Meta {
  custom: string[];
  include: string[];
  pagination?: {
    count: number;
    current_page: number;
    links: { next: string };
    per_page: number;
    total: number;
    total_pages: number;
  };
}

export interface LoginResponse {
  token_type: string;
  expires_in: number;
  access_token: string;
  refresh_token: string;
}
