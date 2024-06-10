import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { ColDef } from 'ag-grid-community';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {PaymentsService} from "../services/payments.service";
import {
  DialogElementsExampleDialogComponent
} from "../utils/dialog-elements-example-dialog/dialog-elements-example-dialog.component";
import {MatDialog} from "@angular/material/dialog"; // Column Definition Type Interface


@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrl: './payments.component.css'
})
export class PaymentsComponent implements OnInit {
  public payments: any;
  public dataSource: any;
  public displayedColumns=['id','date', 'amount', 'type', 'status', 'firstName']

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  /*rowData = [
    { make: "Tesla", model: "Model Y", price: 64950, electric: true },
    { make: "Ford", model: "F-Series", price: 33850, electric: false },
    { make: "Toyota", model: "Corolla", price: 29600, electric: false },
  ];
// Column Definitions: Defines the columns to be displayed.
  colDefs: ColDef[] = [
    //sortable: false
    { field: "make", headerName: 'make', suppressMenu: true, sort: 'desc',
      width: 270,
    },
    { field: "model" },
    { field: "price" },
    { field: "electric" },
  ];*/

  constructor(private paymentsService: PaymentsService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.paymentsService.getAllPayments().subscribe({
      next: data => {
        this.payments = data;
        this.dataSource = new MatTableDataSource(this.payments);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: err => {
        this.dialog.open(DialogElementsExampleDialogComponent, {
          data:{
            title: "api des payments est tombée KO",
            message: err.message
          }
        });
        console.log("err : ", err)
      }
    });
  }


}
