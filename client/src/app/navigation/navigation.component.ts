import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  date: any
  year: any
  nextyear: any;
  isLoggedIn!:any;
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [  Validators.required,   Validators.minLength(3),
    ]),
  });
  userDetials: any;
  constructor(private service: ApiServiceService,
    public router: Router,
    public authService: AuthService,
  ) { }



  
  
  logout() {
    this.authService.deauthenticate();
    localStorage.removeItem("userObject");
    localStorage.removeItem("Token");
    this.isLoggedIn = false;
    this.router.navigate(['/home']);
    
  }
  checkIfloggedIn() {
      
      if (localStorage.getItem('Token')!.length<0) {
        this.isLoggedIn=false;
        
      }
      else{
        this.isLoggedIn=true;
        this.authService.getProfile().subscribe((result=>{
          this.userDetials=result;
          // console.table(this.userDetials.data);

        }));
          
        
      }
    }
  setDate(){
    this.service.getCurrentDate().subscribe((result: { data: any; }) => {
      this.date = result.data;
      this.year = String(this.date[0].current_timestamp).substring(0, 4);
      this.nextyear = Number(this.year) + 1;

    })
  }

  ngOnInit(): void {
    this.setDate()
    this.checkIfloggedIn();
 
  }
}
