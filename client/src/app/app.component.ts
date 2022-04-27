import { Component,OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


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
  
   constructor( private modalService: NgbModal){

  }
  ngOnInit(): void {
    
    
  }

  openScrollableContent(longContent: any) {
    this.modalService.open(longContent, { scrollable: true, windowClass : "myCustomModalClass" },);
  }

  
 
}
