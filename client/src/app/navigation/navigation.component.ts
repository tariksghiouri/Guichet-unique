import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(private service:ApiServiceService, private modalService: NgbModal) { }
  date:any
  year:any
  nextyear: any;
  ngOnInit(): void {
    this.service.getCurrentDate().subscribe((result: { data: any; }) =>{
      // console.log(result);
      this.date=result.data;
      this.year=String(this.date[0].current_timestamp).substring(0,4);
      this.nextyear=Number(this.year) +1;
      // console.log(this.authservice.getProfile());

    })
  }
  openScrollableContent(longContent: any) {
    this.modalService.open(longContent, { scrollable: true, windowClass : "myCustomModalClass" },);
  }

}
