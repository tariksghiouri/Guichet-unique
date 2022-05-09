import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Request } from '../../../interface/request';
@Component({
  selector: 'app-loginform',
  templateUrl: './loginform.component.html',
  styles: [
    `@import url('https://fonts.googleapis.com/css?family=Roboto:300,400');

    * {
        margin:0;
        padding:0
    }
    a,a:hover{
      text-decoration: none;
    }
    .myform-area{
      overflow: hidden;
      padding: 60px 0;
      background: #f4fffe;
      position: relative;
      padding-top: 100px;
      padding-bottom: 100px;
    }
    .myform-area .form-area{
      position: relative;
      background: rgba(103,58,183,0.7);
      width: 100%;
      height: 400px;
      overflow: hidden;
      box-shadow: 0 0 40px 0 #e1e1e1;
    }
    
    .myform-area .form-area .form-content,
    .myform-area .form-area .form-input{
        position: relative;
        width: 50%;
        height: 100%;
        float: left;
        box-sizing: border-box;
    }
    
    .myform-area .form-area .form-content{
      width: 50%;
      padding: 40px 30px;
    }
    
    .myform-area .form-area .form-content h2{
      color: #fff;
    }
    .myform-area .form-area .form-content p{
      color: #fff;
    }
    .myform-area .form-area .form-content ul{
      margin-top: 50px;
    }
    
    .myform-area .form-area .form-content ul li{
      display: inline-block;
      margin-right: 10px;
    }
    .myform-area .form-area .form-content a i{
        margin-right: 10px;
    }
    
    .myform-area .form-area .form-content .facebook{
      display: block;
      padding: 10px 20px;
      background: #3B579D;
      color: #fff;
      font-size: 15px;
      text-transform: capitalize;
      border-radius: 4px;
      border: 1px solid #3B579D;
      -webkit-transition: all .5s;
      -o-transition: all .5s;
      transition: all .5s;
    }
    
    .myform-area .form-area .form-content .facebook:hover,
    .myform-area .form-area .form-content .facebook:focus{
        background: transparent;
    }
    
    .myform-area .form-area .form-content .twitter{
      display: block;
       padding: 10px 20px;
       background: #00ACED;
       color: #fff;
       font-size: 15px;
       text-transform: capitalize;
       border-radius: 4px;
       border: 1px solid #00ACED;
       -webkit-transition: all .5s;
       -o-transition: all .5s;
       transition: all .5s;
    }
    
    .myform-area .form-area .form-content .twitter:hover,
    .myform-area .form-area .form-content .twitter:focus{
        background: transparent;
    }
    .myform-area .form-area .form-input{
      background-color: white;
      position: relative;
      overflow: hidden;
      box-shadow: 0 0 40px 0 #e1e1e1;
    }
    .myform-area .form-area .form-input{
        width: 50%;
        background: #fff;
        padding: 40px 30px;
    }
    
    .myform-area .form-area .form-input h2{
      margin-bottom: 20px;
        color: #07315B;
    }
    
    .myform-area .form-area .form-input input{
        position: relative;
        height: 60px;
        padding: 20px 0;
    }
    .myform-area .form-area .form-input textarea{
        height: 120px;
        padding: 20px 0;
    }
    
    .myform-area .form-area .form-input input,
    .myform-area .form-area .form-input textarea{
        text-transform: capitalize;
        width: 100%;
        box-sizing: border-box;
        outline: none;
        border: none;
        border-bottom: 2px solid #e1e1e1;
        color: #07315B;
    }
    .myform-area .form-area .form-input form .form-group{
        position: relative;
    }
    .myform-area .form-area .form-input form .form-group label{
        position: absolute;
        text-transform: capitalize;
        top: 20px;
        left: 0;
        pointer-events: none;
        font-size: 14px;
        color: #595959;
        margin-bottom: 0;
        transition: all .6s;
    }
    .myform-area .form-area .form-input input:focus ~ label,
    .myform-area .form-area .form-input textarea:focus ~ label,
    .myform-area .form-area .form-input input:valid ~ label,
    .myform-area .form-area .form-input textarea:valid ~ label{
        top: -5px;
        opacity: 0;
        left: 0;
        color: rgba(103,58,183);
        font-size: 12px;
        color: #07315B;
        font-weight: bold;
    }
    .myform-area .form-area .form-input input:focus,
    .myform-area .form-area .form-input textarea:focus,
    .myform-area .form-area .form-input input:valid,
    .myform-area .form-area .form-input textarea:valid{
        border-bottom: 2px solid rgba(103,58,183);
    }
    .myform-area .form-area .form-text{
        margin-top: 30px;
    }
    .myform-area .form-area .form-text span a{
        color: rgba(103,58,183);
    }
    .myform-area .form-area .myform-button{
        margin-top: 30px;
    }
    .myform-area .form-area .myform-button .myform-btn{
        width: 100%;
        height: 50px;
        font-size: 17px;
        background: rgba(103,58,183);
        border: none;
        border-radius: 50px;
        color: #fff;
        cursor: pointer;
        -webkit-transition: all .5s;
        -o-transition: all .5s;
        transition: all .5s;
    }
    .myform-area .form-area .myform-button .myform-btn:hover{
        background: #07315B;
    }
    
    `,
  ],
})
export class LoginformComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private routerS: Router
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
      this.toastr.success(res.message);
      this.authService.getProfile().subscribe((res: any) => {
        this.toastr.show(res.data.name);
      })
    });
  }
}
