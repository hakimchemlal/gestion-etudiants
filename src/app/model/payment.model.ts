import {Student} from "./student.model";
import {PaymentStatus} from "../enumeration/paymentStatus";
import {PaymentType} from "../enumeration/paymentType";

export interface Payment{
  id?:number,
  date?: string,
  amount?: number,
  type?:PaymentType,
  status?: PaymentStatus,
  file?: string,
  student?: Student
}
