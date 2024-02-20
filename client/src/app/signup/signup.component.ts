import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  loginForm: FormGroup;
  errorMessage: string;

  constructor(private formBuilder: FormBuilder, private auth: AuthService, private router: Router, private spinner: NgxSpinnerService) {
    this.errorMessage = '';
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      repeatPassword: ['', Validators.required],
      cin: ['', Validators.required],
    });
  }

  isInputValid(controls: any): Boolean {
    for(const control of controls) 
      if (!control?.valid)
        return false;
      
    if (controls[1].value !== controls[2].value)
      return false;
    
    return true;
  }

  onSubmit() {
    this.spinner.show();

    const usernameControl = this.loginForm.get('username');
    const passwordControl = this.loginForm.get('password');
    const repeatPasswordControl = this.loginForm.get('repeatPassword');
    const cinControl = this.loginForm.get('cin');
    const controls = [usernameControl, passwordControl, repeatPasswordControl, cinControl];
    
    if (this.isInputValid(controls)) {
      const username = usernameControl?.value;
      const password = passwordControl?.value;
      this.errorMessage = '';

      this.auth.signup(this.loginForm.value).subscribe({
        next: (result) => {
          this.spinner.hide();
          this.router.navigate(['/login']);
        },
        error: (err) => {
          this.spinner.hide();
          this.errorMessage = "Erreur d'authentification";
        },
      });
    } else {
      this.spinner.hide();
      this.errorMessage = 'Please enter valid credentials';
    }
  }
}
