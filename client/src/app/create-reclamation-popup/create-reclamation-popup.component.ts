import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Service } from '../services/service';
import { MatSelectChange } from '@angular/material/select';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-create-reclamation-popup',
  templateUrl: './create-reclamation-popup.component.html',
  styleUrls: ['./create-reclamation-popup.component.css']
})
export class CreateReclamationPopupComponent {
  editData!: any;
  myForm!: FormGroup;

  constructor(private ref: MatDialogRef<CreateReclamationPopupComponent>, private builder: FormBuilder, 
    private service: Service, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.myForm = this.builder.group({
      subject: this.builder.control(''),
      description: this.builder.control(''),
    }); 
  }

  closepopup() {
    this.ref.close('Popup Closed');
  }

  save() {
    this.spinner.show();

    this.service.CreateReclamation(this.myForm.value).subscribe(res => {
      this.spinner.show();
      this.closepopup();
    });
  }
}
