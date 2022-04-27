import { Component, OnInit } from '@angular/core';
import {ApiServiceService} from '../api-service.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(private service:ApiServiceService) { }
  readData:any;

  ngOnInit(): void {
    this.service.getAllfils().subscribe((result: { data: any; }) =>{
      console.log(result);
      this.readData=result.data;
    })
  }

}
