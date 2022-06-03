import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiServiceService } from '@app/api-service.service';
import { AccountService, AlertService } from '@app/_services';

@Component({
  selector: 'app-personal-info-edit',
  templateUrl: './personal-info-edit.component.html',
  styleUrls: ['./personal-info-edit.component.less']
})
export class PersonalInfoEditComponent implements OnInit {
  candidature: any;
  submitted=false
  editForm!: FormGroup;
  account = this.accountService.accountValue;
  DateDeNaissance: any;
  noCondidature: boolean;

  constructor(private api: ApiServiceService, 
    private formBuilder: FormBuilder
    , private accountService: AccountService, private alertService: AlertService
    ) { }

  ngOnInit(): void {
   
    this.api.getUserCandudatures().subscribe((result: { data: any; }) => {
      if (!Object.keys(result.data).length) {
        this.noCondidature = true;
    }
    else {
      this.noCondidature = false
      console.log(result.data);
      this.candidature = result.data[0];
      console.log(this.candidature);
      this.DateDeNaissance = this.candidature.DateDeNaissance.slice(0, 10);
    }
    })

    this.editForm = this.formBuilder.group(
      {
        IdCompte: [this.account.id,],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        firstNameAr: ['', Validators.required],
        lastNameAr: ['', Validators.required],
        dob: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        telephone: ['', Validators.required],
        LieuDeNaissance: ['', Validators.required],
        CIN: ['', Validators.required],
        CNE: [, ],
        Adresse: ['', Validators.required],


      }
    );
    
  } 
  get f() {
    return this.editForm.controls;
  }
  onSubmit(){
    this.editForm.patchValue({
      CNE: this.candidature.CNE,
      
    });
    console.log(this.editForm.value);
    
    this.submitted = true;
    // stop here if form is invalid
    if (this.editForm.invalid) {
      window.scrollTo(0, 0);
      this.alertService.error("vous devez remplir tous les champs");
      return;
    }
    this.api.editPersonal(this.editForm.value).subscribe((res: any)=>{
      console.log(res);
      if (res.success) {

      window.scrollTo(0, 0);
      this.alertService.success("vous avez modifier vos informations avec succès");
      }
      else{
        window.scrollTo(0, 0);
        this.alertService.error("Une erreur est survenue");
      }
      
    })
  }
  onReset(){}

}
