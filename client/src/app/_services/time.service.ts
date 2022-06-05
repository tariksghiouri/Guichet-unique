import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http'
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class TimeService {
  anneuni: any;
  DebutCandidatures: any;
  FinCandidatures: any;
  currDate: any;
  dateDebut: any;
  dateFin: any;
  public timIsUp: boolean=false;


  constructor(
    private _http: HttpClient,
  ) { }

  apiUrl = "http://localhost:4000";

  allTimes(): any {
    return this._http.get(`${this.apiUrl + "/AnneeUiversitaire"}`);
  }
  isTimeUp(): any {
    this.allTimes().subscribe((result: any) => {
      this.DebutCandidatures = result[0].DebutCandidatures;
      this.FinCandidatures = result[0].FinCandidatures;
      this.currDate = formatDate(new Date(), 'yyyy-MM-dd', 'en_US');
      this.dateDebut = formatDate(this.DebutCandidatures, 'yyyy-MM-dd', 'en_US');
      this.dateFin = formatDate(this.FinCandidatures, 'yyyy-MM-dd', 'en_US');
      
      console.log(this.dateDebut);
      console.log(this.currDate);

      console.log(this.dateFin);
    if (this.dateDebut < this.currDate && this.currDate < this.dateFin) {
      console.log('peut');
      this.timIsUp=true;
      return true;
    } else {
      console.log('peut pas');
      this.timIsUp=false;

      return false;
    }

    });
   
  }

}
