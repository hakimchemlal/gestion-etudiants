import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {PaymentType} from "../enumeration/paymentType";
import {PaymentsService} from "../services/payments.service";

@Component({
  selector: 'app-new-payment',
  templateUrl: './new-payment.component.html',
  styleUrl: './new-payment.component.css'
})
export class NewPaymentComponent implements OnInit{
  paymentFormGroup!:FormGroup;
  studentCode!: string;
  paymentType: string[] = [];
  pdfFileUrl!: string;
  showProgress: boolean = false;
  constructor(private fb:FormBuilder, private activatedRoute: ActivatedRoute, private paymentService: PaymentsService, private router: Router) {
  }

  ngOnInit(): void {
    for(let type in PaymentType){
      let value = PaymentType[type]
      if(typeof value === 'string'){
        this.paymentType.push(value);
      }
    }
    this.studentCode = this.activatedRoute.snapshot.params['studentCode']
    this.paymentFormGroup = this.fb.group({
      date: this.fb.control(''),
      amount: this.fb.control(''),
      type: this.fb.control(''),
      studentCode: this.fb.control(this.studentCode),
      fileSource: this.fb.control(''),
      fileName: this.fb.control(''),
    })
  }

  selectFile($event: any) {
    if($event.target.files.length>0){
      let file = $event.target.files[0];
      this.paymentFormGroup.patchValue({
        fileSource: file,
        fileName: file.name
      });
      this.pdfFileUrl = window.URL.createObjectURL(file);
    }
  }

  savePayment() {
    this.showProgress = true;
    let date = new Date(this.paymentFormGroup.value.date);
    let formattedDate = date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear();
    let formData = new FormData();
    formData.append('date', formattedDate);
    formData.append('amount', this.paymentFormGroup.value.amount);
    formData.append('type', this.paymentFormGroup.value.type);
    formData.append('studentCode', this.paymentFormGroup.value.studentCode);
    formData.append('file', this.paymentFormGroup.get('fileSource')!.value);
    console.log("formData : ",formData);

    this.paymentService.savePayment(formData).subscribe({
      next: (data)=>{
        console.log("data : ",data)
        this.showProgress = false;
        alert("Payment saved successfully");
        this.paymentFormGroup.reset();
        this.router.navigateByUrl("/admin/payments")
      },
      error: (error)=>{
        this.showProgress = false;
        console.log("error : ",error)
      }
    })

    }

  afterLoadComplete($event: any) {
    console.log("afterLoadComplete : ",$event)
  }
}
