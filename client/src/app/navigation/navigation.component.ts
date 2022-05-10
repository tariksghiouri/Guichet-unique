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
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
  });
  constructor(private service: ApiServiceService,
    private modalService: NgbModal,
    public router: Router,
    private authService: AuthService,
    private toastr: ToastrService,
  ) { }


  handleSubmit() {
    this.authService.logIn(this.loginForm.value).subscribe((res: any) => {
      this.toastr.show(res.message);
      this.authService.getProfile().subscribe((res: any) => {


        localStorage.setItem('userObject', JSON.stringify(res));


        // this.isLoggedIn=false;
        var compte = JSON.parse(localStorage.getItem('userObject') || '{}');
        console.log(this.isLoggedIn + "---" + compte.data.name);

        if (compte.data.name == '') {
          this.isLoggedIn = false;
        }

        else {
          this.isLoggedIn = true;
        }


      })
    });
  }
  ngOnInit(): void {

    var compte = JSON.parse(localStorage.getItem('userObject') || '{}');
    console.log(this.isLoggedIn + "---" + compte.data.name);

    if (compte.data.name == '') {
      this.isLoggedIn = false;
    }

    else {
      this.isLoggedIn = true;
    }




    this.service.getCurrentDate().subscribe((result: { data: any; }) => {
      // console.log(result);
      this.date = result.data;
      this.year = String(this.date[0].current_timestamp).substring(0, 4);
      this.nextyear = Number(this.year) + 1;
      // console.log(this.authservice.getProfile());

    })
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

}
