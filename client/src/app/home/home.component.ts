import { Component, OnInit } from '@angular/core';
import {ApiServiceService} from '../api-service.service';

import { AccountService } from '@app/_services';

@Component({ 
    templateUrl: 'home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent  implements OnInit {
    account = this.accountService.accountValue;
    readData:any;

    constructor(private accountService: AccountService,private service:ApiServiceService) { }
    ngOnInit(): void {
        this.service.getAllfils().subscribe((result: { data: any; }) =>{
          console.log(result);
          this.readData=result.data;
        })
      }
}