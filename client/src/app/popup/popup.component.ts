import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {
  inputdata: any;
  editdata: any;
  closemessage = 'closed using directive'
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private ref: MatDialogRef<PopupComponent>, private builder: FormBuilder) {
    console.log('data', this.data)
  }

  ngOnInit(): void {
    this.inputdata = this.data;
    this.setpopupdata(this.inputdata.id)
  }

  setpopupdata(id: any) {
    this.editdata = {status: 'En Attente', cin: 123456789, subject: 'subjectt', date: '01-15-2023'}
    this.myform.setValue({
      cin: this.editdata.cin,
      date: this.editdata.date,
      subject: this.editdata.subject,
      status: this.editdata.status
    });
  }

  closepopup() {
    this.ref.close('Closed using function');
  }

  myform = this.builder.group({
    status: this.builder.control(''),
    cin: this.builder.control(0),
    subject: this.builder.control(''),
    date: this.builder.control(''),
  });

  Saveuser() {
    // this.service.Savecustomer(this.myform.value).subscribe(res => {
    //   this.closepopup();
    // });
  }
}
