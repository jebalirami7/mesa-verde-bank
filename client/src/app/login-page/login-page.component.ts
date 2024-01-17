import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent {
  loginForm: FormGroup;
  errorMessage: string;

  constructor(private formBuilder: FormBuilder, private auth: AuthService, private router: Router) {
    this.errorMessage = '';
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    const usernameControl = this.loginForm.get('username');
    const passwordControl = this.loginForm.get('password');

    if (usernameControl && passwordControl && usernameControl.valid && passwordControl.valid) {
      const username = usernameControl.value;
      const password = passwordControl.value;
      this.errorMessage = '';

      this.auth.login(this.loginForm.value).subscribe({
        next: (result) => {
          this.auth.setToken(result.token);
          this.router.navigate(['/reclamations']);
        },
        error: (err) => {
          this.errorMessage = "Erreur d'authentification";
        },
      });
    } else {
      this.errorMessage = 'Please enter valid credentials';
    }
  }
}
