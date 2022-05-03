import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ApiServiceService } from '../api-service.service';

@Component({
  selector: 'app-multistep-form',
  templateUrl: './multistep-form.component.html',
  styleUrls: ['./multistep-form.component.css']
})
export class MultistepFormComponent implements OnInit {
  personalDetails!: FormGroup;
  addressDetails!: FormGroup;
  education!: FormGroup;
  personal_step = false;
  address_step = false;
  education_step = false;
  accepted!:FormGroup;
  step = 1;
  readData: any;
  diplomes: any;
  myformData: any = new FormData();
  constructor(private formBuilder: FormBuilder, private service: ApiServiceService) { }

  ngOnInit() {
    this.service.getAllbacs().subscribe((result: { data: any; }) => {
      // console.log(result);
      this.readData = result.data;
    })
    this.service.getAlldips().subscribe((result: { data: any; }) => {
      // console.log(result);
      this.diplomes = result.data;
    })

    this.personalDetails = this.formBuilder.group({
      nomFr: ['', Validators.required],
      prenomFr: ['', Validators.required],
      nomAr: ['', Validators.required],
      prenomAr: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      cin: ['', <any>[Validators.required, Validators.minLength(10)]],
      LieuDeNaissance: ['', Validators.required],
      datenaiss: ['', Validators.required],
      cne: ['', Validators.required],
      // nomFr: ['', ],
      // prenomFr: ['', ],
      // nomAr: ['', ],
      // prenomAr: ['',],
      // email: ['', ],
      // phone: ['', ],
      // cin: ['', ],
      // LieuDeNaissance: ['', ],
      // datenaiss: ['', ],
      // cne: ['', ]

    });

    this.addressDetails = this.formBuilder.group({
      city: ['', Validators.required],
      address: ['', Validators.required],
      codePostal: ['', Validators.required],

    });

    this.education = this.formBuilder.group({
      // bac: ['', Validators.required],
      // notebac: ['', Validators.required],
      // anneebac: ['', Validators.required],

      // diplome: ['', Validators.required],
      // annediplo: ['', Validators.required],
      // notediplo: ['', Validators.required],
      bac: ['', ],
      notebac: ['', ],
      anneebac: ['', ],

      diplome: ['', ],
      annediplo: ['', ],
      notediplo: ['', ],


    });
    this.accepted= this.formBuilder.group({
      acceptTerms: [false, Validators.requiredTrue]
    });
  }

  get personal() { return this.personalDetails.controls; }

  get address() { return this.addressDetails.controls; }

  get education_() { return this.education.controls; }
  get f() { return this.accepted.controls; }
  next() {

    if (this.step == 1) {
      this.personal_step = true;
      if (this.personalDetails.invalid) { return }
      this.step++
    }

    else if (this.step == 2) {
      this.address_step = true;
      if (this.addressDetails.invalid) { return }
      this.step++;
    }


  }

  previous() {
    this.step--

    if (this.step == 1) {
      this.address_step = false;
    }
    if (this.step == 2) {
      this.education_step = false;
    }

  }



  // });
  // datacan = {
  //   CIN: this.personalDetails.controls.cin.value,
  //   CNE: this.addressDetails.controls.cne.value,
  //   nomFr: this.personalDetails.controls.name.value,
  //   prenomFr: this.addressDetails.controls.address.value,
  //   email: this.addressDetails.controls.address.value,
  //   DateDeNaissance: this.addressDetails.controls.address.value,
  //   LieuDeNaissance: this.addressDetails.controls.address.value,
  //   Adresse: this.addressDetails.controls.address.value,
  //   Tel: this.addressDetails.controls.address.value,
  //   IntituleBAC: this.addressDetails.controls.address.value,
  //   DiplomeObtenu: this.addressDetails.controls.address.value,
  //   IntituleFiliere: this.addressDetails.controls.address.value,
  //   Etablissement: this.addressDetails.controls.address.value,
  //   ville: this.addressDetails.controls.address.value,
  //   Moyenne1année: this.addressDetails.controls.address.value,
  //   Moyenne2année: this.addressDetails.controls.address.value,
  //   MoyenneDiplôme: this.addressDetails.controls.address.value,
  //   AnnéeDiplôme: this.addressDetails.controls.address.value,
  // };
  submit() {

    if (this.step == 3) {
      this.education_step = true;
      if (this.education.invalid) { return }
      //  personalDetails
      // this.myformData.append("nomFr", this.personalDetails.controls.nomFr.value);
      // this.myformData.append("prenomFr", this.personalDetails.controls.prenomFr.value);
      // this.myformData.append("nomAr", this.personalDetails.controls.nomAr.value);
      // this.myformData.append("prenomAr", this.personalDetails.controls.prenomAr.value);
      // this.myformData.append("email", this.personalDetails.controls.email.value);
      // this.myformData.append("phone", this.personalDetails.controls.phone.value);
      // this.myformData.append("cin", this.personalDetails.controls.cin.value);
      // this.myformData.append("LieuDeNaissance", this.personalDetails.controls.LieuDeNaissance.value);
      // this.myformData.append("datenaiss", this.personalDetails.controls.datenaiss.value);
      // this.myformData.append("cne", this.personalDetails.controls.cne.value);
      // addressDetails
      this.myformData.append("address", this.addressDetails.controls.address.value+
                              ", "+ this.addressDetails.controls.city.value +", "+
                               this.addressDetails.controls.codePostal.value)
                            

      // console.log(this.myformData.getAll());
      console.table(Object.fromEntries(this.myformData))
      // nomFr: ['', Validators.required],
      // prenomFr: ['', Validators.required],
      // nomAr: ['', Validators.required],
      // prenomAr: ['', Validators.required],
      // email: ['', Validators.required],
      // phone: ['', Validators.required],
      // cin: ['', Validators.required],
      // LieuDeNaissance: ['', Validators.required],
      // datenaiss: ['', Validators.required],
      // cne: ['', Validators.required],


    }
  }

}
