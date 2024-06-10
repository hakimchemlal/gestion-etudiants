import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-dialog-elements-example-dialog',
  templateUrl: './dialog-elements-example-dialog.component.html',
  styleUrl: './dialog-elements-example-dialog.component.css'
})
export class DialogElementsExampleDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
  }


}
