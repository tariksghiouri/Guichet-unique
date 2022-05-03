import { Component,OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiServiceService } from './api-service.service';
import { AuthService } from "./service/auth.service";



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  styles: [`
    .dark-modal .modal-content {
      background-color: #292b2c;
      color: white;
    }
    .dark-modal .close {
      color: white;
    }
    .light-blue-backdrop {
      background-color: #5cb3fd;
    }
  `]
})
export class AppComponent implements OnInit {
    date:any
    year:any
    nextyear: any;
   constructor( private modalService: NgbModal, private service:ApiServiceService ,private authservice: AuthService){

  }
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
