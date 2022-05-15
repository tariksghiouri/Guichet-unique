import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Request } from '../../../interface/request';
import { NavigationComponent } from 'src/app/navigation/navigation.component';
@Component({
  selector: 'app-loginform',
  templateUrl: './loginform.component.html',
  styles: [
  ],
})
export class LoginformComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private routerS: Router,
    // private navigationC:NavigationComponent
  ) {}

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
  });

  ngOnInit(): void {}
  showValue() {
    // console.log(this.loginForm);
  }

  handleSubmit() {
    this.authService.logIn(this.loginForm.value).subscribe((res: any) => {
      this.toastr.show(res.message,"login"
        , {timeOut:1000 , extendedTimeOut:1000});
     this.routerS.navigate(['/home']);
            //window.location.reload();

      this.authService.getProfile().subscribe((res: any) => {
      

        // this.toastr.show(res.data.name);
      })
    });
  }

  // handleSubmit() {
  //   this.authService.logIn(this.loginForm.value).subscribe((res: any) => {
  //    if (res.status==200) {
  //       this.authService.storeUserData(res.token);
  //       this.routerS.navigate(['/home']);
  //       window.location.reload();
  //       this.navigationC.isLoggedIn=true;

       
  //    }else{
  //     this.routerS.navigate(['/home']);
  //     // this.toastr.show(res.message);
  //     this.navigationC.isLoggedIn=false;

  //    }
     

      

  //   });
  // }
  
  
}
