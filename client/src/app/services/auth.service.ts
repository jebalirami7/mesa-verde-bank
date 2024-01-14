import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }


  login(credentials : any) : Observable<any> {
    return this.http.post<any>(`${environment.apiURL}/user/login`, credentials);
  }



  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken()  {
    return localStorage.getItem('token');
  }

  logout(){
    localStorage.removeItem('token');
  }

}
