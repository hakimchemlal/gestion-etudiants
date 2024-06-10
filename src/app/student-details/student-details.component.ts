import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {StudentsService} from "../services/students.service";
import {Payment} from "../model/payment.model";
import {MatTableDataSource} from "@angular/material/table";
import {Student} from "../model/student.model";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {PaymentsService} from "../services/payments.service";

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrl: './student-details.component.css'
})
export class StudentDetailsComponent implements OnInit{
  studentCode!: string;
  studentPayments!: Array<Payment>;
  public dataSource!: MatTableDataSource<Payment>;
  public displayedColumns=['id','date', 'type', 'status', 'amount', 'firstName']

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private activatedRoute: ActivatedRoute, private paymentsService: PaymentsService, private router:Router) {
  }
  ngOnInit(): void {
    this.studentCode = this.activatedRoute.snapshot.params['code']
    this.paymentsService.getPaymentStudentByCode(this.studentCode).subscribe({
      next: data =>{
        this.studentPayments = data;
        this.dataSource = new MatTableDataSource<Payment>(this.studentPayments);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: err => {
        console.log("err : ", err)
      }
    })
  }

  newPayment() {
    this.router.navigateByUrl(`/admin/new-payment/${this.studentCode}`)
  }
}
