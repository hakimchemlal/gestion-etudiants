import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Payment} from "../model/payment.model";

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {

  constructor(private http: HttpClient) {
  }

  public getPaymentStudentByCode(studentCode: string): Observable<Array<Payment>>{
    return this.http.get<Array<Payment>>(`${environment.backendHost}/payment/paymentsByStudent/${studentCode}`);
  }

  public getAllPayments(): Observable<Array<Payment>> {
    return this.http.get<Array<Payment>>(`${environment.backendHost}/payment/all`);
  }

  public savePayment(formData: any): Observable<Payment> {
    return this.http.post<Payment>(`${environment.backendHost}/payment/savePayment`, formData);
  }
}
