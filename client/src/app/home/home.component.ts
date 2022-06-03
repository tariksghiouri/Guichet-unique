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


  constructor(
    private accountService: AccountService,
    private service: ApiServiceService,
    private timeService: TimeService,
  ) { }
  ngOnInit(): void {
  
    this.timeService.isTimeUp();
    this.service.getAllfils().subscribe((result: { data: any; }) => {
      // console.log(result);
      this.readData = result.data;
      console.log();
      
    })
  }
}