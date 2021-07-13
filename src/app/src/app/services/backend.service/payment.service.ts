import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Payment, CreateCustomerResponse, CreateStripeAccountResponse, UnregisteredStripeAccount } from '../../models/Payment';
import { retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient) {
  }

  createCustomer(): Observable<CreateCustomerResponse> {
    return this.http.get<CreateCustomerResponse>('checkout').pipe(
      retry(2)
    );
  }

  pay(payment: Payment): Observable<object> {
    return this.http.post('checkout', payment).pipe(
      retry(2)
    );
  }

  createStripeAccount(account: UnregisteredStripeAccount): Observable<CreateStripeAccountResponse> {
    return this.http.post<CreateStripeAccountResponse>('user/payments/accounts/stripe', account).pipe(
      retry(2)
    );
  }
}

