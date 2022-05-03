import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  constructor(private _http: HttpClient) { }

    apiUrl="http://localhost:3000";

    getAllfils():Observable<any>{

      return this._http.get(`${this.apiUrl+"/fils"}`);
    }
    getAllbacs():Observable<any>{

      return this._http.get(`${this.apiUrl+"/bacs"}`);
    }
    getAlldips():Observable<any>{

      return this._http.get(`${this.apiUrl+"/diplomes"}`);
    }
    getCurrentDate():Observable<any>{

      return this._http.get(`${this.apiUrl+"/curDate"}`);
    }
    sendcandidatData(candidatData: any){
     return this._http.post(`${this.apiUrl+"/candidatData"}`, candidatData).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    )
    }
  
}
