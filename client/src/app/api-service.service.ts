import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http'
import { Observable } from 'rxjs/internal/Observable';
import { AccountService, AlertService } from './_services/';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {


  constructor(
    private _http: HttpClient,
    private alertService: AlertService,
    private accountService: AccountService
  ) { }

  apiUrl = "http://localhost:4000";

  getAllfils(): Observable<any> {

    return this._http.get(`${this.apiUrl + "/fils"}`);
  }

  getAllfilsC(): Observable<any> {

    return this._http.get(`${this.apiUrl + "/filsC"}`);
  }
  getAllfilsCById(id: any): Observable<any> {

    return this._http.get(`${this.apiUrl + "/filsC/" + id}`);
  }
  getetablissementById(id: any): Observable<any> {

    return this._http.get(`${this.apiUrl + "/etablissement/" + id}`);
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
    console.log(candidatData);
     return this._http.post(`${this.apiUrl + "/candidatData"}`, candidatData);
  }

  upload(file: File, index): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    if (file.name.split('.').pop() != "pdf") {
           this.alertService.clear();
    this.alertService.error("les fichers doivent etre en format PDF");
      return;

    }
    formData.append('file', file, 'test'+index+'.' + file.name.split('.').pop());
    const req = new HttpRequest('POST', `${this.apiUrl}/upload`, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this._http.request(req);
  }
  getFiles(): Observable<any> {
    return this._http.get(`${this.apiUrl}/files`);
  }

  getUserCandudatures(id: any): Observable<any> {
    return this._http.get(`${this.apiUrl + "/candidat/" + this.accountService.accountValue.id}`);
  }

}
