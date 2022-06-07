import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../api-service.service';

import { AccountService, TimeService } from '@app/_services';
import { DatePipe, formatDate } from '@angular/common';

@Component({
  templateUrl: 'home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  account = this.accountService.accountValue;
  readData: any;
  //date related
  anneuni: any
  date1
  date2
  DebutCandidatures
  DebutPreselection
  FinCandidatures
  FinPreselection
  InscriptionsListAtt
  InscriptionsListP
  Test
  lesDates: { data: any; };
  mDebutCandidatures: any;
  mFinCandidatures: any;
  mDebutPreselection: any;
  mFinPreselection: any;
  mTest: any;
  mInscriptionsListP: any;
  mInscriptionsListAtt: any;

  constructor(
    private accountService: AccountService,
    private service: ApiServiceService,
    private timeService: TimeService,
  ) { }
  ngOnInit(): void {
    const dateformat = 'dd/MM/yyyy';
    const locale = 'en-US';
    this.service.getDatesFormated().subscribe((result: { data: any; }) => {

      console.log(result);
        this.lesDates = result;
        this.mDebutCandidatures =formatDate( this.lesDates[0].DebutCandidatures,dateformat, locale)
        this.mFinCandidatures = formatDate(this.lesDates[0].FinCandidatures,dateformat, locale);
        this.mDebutPreselection =formatDate( this.lesDates[0].DebutPreselection,dateformat, locale);
        this.mFinPreselection = formatDate(this.lesDates[0].FinPreselection,dateformat, locale);
        this.mTest = formatDate(this.lesDates[0].Test,dateformat, locale);
        this.mInscriptionsListP =formatDate( this.lesDates[0].InscriptionsListP,dateformat, locale);
        this.mInscriptionsListAtt = formatDate(this.lesDates[0].InscriptionsListAtt,dateformat, locale);

      
    });
    this.timeService.isTimeUp();
    this.service.getAllfils().subscribe((result: { data: any; }) => {
      // console.log(result);
      this.readData = result.data;
      console.log();
      
    })
  }
}