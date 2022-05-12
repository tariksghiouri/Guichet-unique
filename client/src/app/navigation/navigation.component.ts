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
  isLoggedIn!: boolean;
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [  Validators.required,   Validators.minLength(3),
    ]),
  });
  userDetials: any;
  constructor(private service: ApiServiceService,
    private modalService: NgbModal,
    public router: Router,
    private authService: AuthService,
    private toastr: ToastrService,
  ) { }


  handleSubmit() {
    this.authService.logIn(this.loginForm.value).subscribe((res: any) => {
     if (res.status==200) {
        this.authService.storeUserData(res.token);
        this.router.navigate(['/form']);
        window.location.reload();
        this.isLoggedIn=true;

       
     }else{
      this.router.navigate(['/home']);
      // this.toastr.show(res.message);
      this.isLoggedIn=false;

     }
     

      

    });
  }
  
  openScrollableContent(longContent: any) {
    this.modalService.open(longContent, { scrollable: true, windowClass: "myCustomModalClass" },);
  }
  logout() {
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
              console.table(this.userDetials.data);

      }));
        
      
    }
  }

  ngOnInit(): void {
    this.checkIfloggedIn();
    this.service.getCurrentDate().subscribe((result: { data: any; }) => {
      // console.log(result);
      this.date = result.data;
      this.year = String(this.date[0].current_timestamp).substring(0, 4);
      this.nextyear = Number(this.year) + 1;
      // console.log(this.authservice.getProfile());

    })
  }
}
