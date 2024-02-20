// import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Service {
  constructor(private http: HttpClient) {}

  GetReclamation(param: any): Observable<any> {
    let getRecs = "/reclamation/getAll";
    if (param == "in-progress" || param == "accepted" || param == "rejected") 
      getRecs += "/" + param;
    return this.http.get<any>(environment.apiURL + getRecs);
  }

  SaveReclamation(id: any, data: any) {
    return this.http.patch(environment.apiURL + '/reclamation/' + id, data);
  }

  CreateReclamation(data: any) {
    return this.http.post(environment.apiURL + '/reclamation/', data);
  }

  GetReclamationById(id: any): Observable<any> {
    return this.http.get(environment.apiURL + '/reclamation/getOne/' + id);
  }

  GetCount(): Observable<any> {
    return this.http.get(environment.apiURL + '/reclamation/count');
  }
}
