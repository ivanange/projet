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
  token: string;
  user_id: number;
  phone: string;
}
