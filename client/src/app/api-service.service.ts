import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  constructor(private _http: HttpClient) { }

    apiUrl="http://localhost:3000/fils";
    getAllfils():Observable<any>{

      return this._http.get(`${this.apiUrl}`);
    }
  
}
