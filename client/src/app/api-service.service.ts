import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {


  constructor(private _http: HttpClient) { }

  apiUrl = "http://localhost:3000";

  getAllfils(): Observable<any> {

    return this._http.get(`${this.apiUrl + "/fils"}`);
  }

  getAllfilsC(): Observable<any> {

    return this._http.get(`${this.apiUrl + "/filsC"}`);
  }
  getAllfilsCById(id: any): Observable<any> {

    return this._http.get(`${this.apiUrl + "/filsC/" + id}`);
  }
  getfilApotulerById(id: any): Observable<any> {

    return this._http.get(`${this.apiUrl + "/filspourpostuler/" + id}`);
  }

  getAllbacs(): Observable<any> {

    return this._http.get(`${this.apiUrl + "/bacs"}`);
  }
  getAlldips(): Observable<any> {

    return this._http.get(`${this.apiUrl + "/diplomes"}`);
  }
  getCurrentDate(): Observable<any> {

    return this._http.get(`${this.apiUrl + "/curDate"}`);
  }


  sendcandidatData(candidatData: any) {
    var object =JSON.stringify(candidatData)
    console.log(object);
    var jsonObject={object};

    return this._http.post(`${this.apiUrl + "/candidatData"}`, jsonObject);
  }

}
