import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Service } from '../services/service';
import { MatSelectChange } from '@angular/material/select';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {
  editData!: any;
  myForm!: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private ref: MatDialogRef<PopupComponent>, private builder: FormBuilder, 
    private service: Service, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show();

    this.setpopupdata(this.data.id)
    this.myForm = this.builder.group({
      status: this.builder.control(''),
      cin: this.builder.control(0),
      subject: this.builder.control(''),
      description: this.builder.control(''),
      date: this.builder.control(''),
    }); 
  }

  onSelectChange(event: MatSelectChange): void {
    if (event.value !== 'default') {
      this.myForm.value.status = event.value;
    } else {
      this.myForm.value.status = "En Attente";
    }
  }

  setpopupdata(id: any) {
    this.service.GetReclamationById(this.data.id).subscribe(item => {
      if (item)
        this.spinner.hide();
      
      this.editData = item;
      this.editData = this.editData.reclamation;
      this.myForm.setValue({
        cin: "*****" + this.editData.cin_client,
        date: this.editData.date,
        subject: this.editData.subject,
        status: this.editData.status,
        description: this.editData.description,
      });
    });    
  }

  closepopup() {
    this.ref.close('Popup Closed');
  }

  save() {
    this.service.SaveReclamation(this.data.id, this.myForm.value).subscribe(res => {
      this.closepopup();
    });
  }
}
