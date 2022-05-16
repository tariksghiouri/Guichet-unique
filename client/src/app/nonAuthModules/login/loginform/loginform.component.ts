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
  ) { }

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
  });

  ngOnInit(): void { }
  showValue() {
    // console.log(this.loginForm);
  }

  handleSubmit() {
    this.authService.logIn(this.loginForm.value).subscribe((res: any) => {
      this.toastr.show(res.message, "login", { timeOut: 1000, extendedTimeOut: 1000 });
      this.authService.authenticate();
      this.routerS.navigate(['/form']);
     
    });

  
}
  
}
