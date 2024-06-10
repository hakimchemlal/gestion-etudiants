import {Component, OnInit, ViewChild} from '@angular/core';
import {StudentsService} from "../services/students.service";
import {Student} from "../model/student.model";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {
  DialogElementsExampleDialogComponent
} from "../utils/dialog-elements-example-dialog/dialog-elements-example-dialog.component";


@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrl: './students.component.css'
})
export class StudentsComponent implements OnInit {
  students!: Array<Student>
  public dataSource!: MatTableDataSource<Student>;
  public displayedColumns=['id','firstName', 'lastName', 'code', 'programId', 'payment']
  erreurService: boolean = false;


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private studentsService: StudentsService, private router: Router, public dialog: MatDialog) {
  }


  ngOnInit(): void {
    this.erreurService = false;
    this.studentsService.getAllStudents().subscribe({
      next: data => {
        this.students = data;
        this.dataSource = new MatTableDataSource(this.students);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: err => {
        this.erreurService = true;
        this.dialog.open(DialogElementsExampleDialogComponent, {
          data:{
            title: "api des utilisateurs est tombée KO",
            message: err.message
          }
        });
        console.log("err : ", err);
      }
    });
  }



  /*preparerDonneesTableau() {
    this.studentsService.getAllStudents().subscribe({
      next: data => {
        console.log("data : ", data)
        data?.forEach(student => {
          const row = {
            id: student?.id,
            firstName: student?.firstName,
            lastName: student?.lastName,
            code: student?.code,
            programId: student?.programId,
          };
          this.donneesTableau.push(row);
        })
        this.students = data;
        console.log("donneesTableau : ", this.donneesTableau)
      },
      error: err => {
        console.log("err : ", err)
      }
    })
  }*/

  studentPayments(student: Student) {
    this.router.navigateByUrl(`/admin/student-details/${student.code}`)
  }
}
