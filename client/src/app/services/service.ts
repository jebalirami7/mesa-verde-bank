// import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reclamation } from '../Entities/Reclamation';

import { Injectable } from '@angular/core';
const url = 'http://localhost:3000';

@Injectable({
  providedIn: 'root',
})
export class Service {
  constructor(private http: HttpClient) {}

  GetReclamation(param: any): Observable<any> {
    let getRecs = "/reclamation/getAll";
    if (param == "in-progress" || param == "accepted" || param == "rejected") 
      getRecs += "/" + param;
    return this.http.get<any>(url + getRecs);
  }

  SaveReclamation(id: any, data: any) {
    console.log(data);
    return this.http.patch(url + '/reclamation/' + id, data);
  }

  GetReclamationById(id: any): Observable<any> {
    return this.http.get(url + '/reclamation/getOne/' + id);
  }

  GetCount(): Observable<any> {
    return this.http.get(url + '/reclamation/count');
  }
}
