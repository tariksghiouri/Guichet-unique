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
  public ilResteDutemps: boolean;


  constructor(
    private _http: HttpClient,
  ) { }

  apiUrl = "http://candidaturelp-ests.uca.ma";

  allTimes(): any {
    return this._http.get(`${this.apiUrl + "/AnneeUiversitaire/formated"}`);
  }
  isTimeUp(): boolean {
    return this.allTimes().subscribe((result: any) => {
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
        this.ilResteDutemps = true;
        return true;
      } else {
        console.log('peut pas');
        this.ilResteDutemps = false;

        return false;
      }

    });
   
  }
  calculateDiff(dateSent){
    let currentDate = new Date();
    dateSent = new Date(dateSent);

    return -Math.floor((Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) - Date.UTC(dateSent.getFullYear(), dateSent.getMonth(), dateSent.getDate()) ) /(1000 * 60 * 60 * 24));
}
}
