import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Payment} from "../model/payment.model";
import {environment} from "../../environments/environment";
import {Student} from "../model/student.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor(private http: HttpClient) { }

  public getAllStudents(): Observable<Array<Student>>{
    return this.http.get<Array<Student>>(`${environment.backendHost}/students/all`);
  }




}
