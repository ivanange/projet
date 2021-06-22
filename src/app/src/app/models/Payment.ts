
export interface UnregisteredStripeAccount {
  customer_id: string;
  card_id: string;
  card_funding: string;
  card_last_digits: string;
  card_fingerprint: string;
  nickname: string;
}

export interface Payment {
  amount: number;
  account_id?: string;
  project_id?: string;
}

export interface CreateCustomerResponse {
  secret: string;
  customer_id: string;
}

export interface CreateStripeAccountResponse {
  message: string;
  stripe_account_id: string;
}
