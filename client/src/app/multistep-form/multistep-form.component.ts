import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiServiceService } from '../api-service.service';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';


@Component({
  selector: 'app-multistep-form',
  templateUrl: './multistep-form.component.html',
  styleUrls: ['./multistep-form.component.css']
})
export class MultistepFormComponent implements OnInit {
  personalDetails!: FormGroup;
  addressDetails!: FormGroup;
  education!: FormGroup;
  choices!: FormGroup;
  files!: FormGroup;
  personal_step = false;
  address_step = false;
  education_step = false;
  choix_step = false;
  files_step = false;
  accepted!: FormGroup;
  step = 1;
  peuxpostuler = true;
  readData: any;
  diplomes: any;
  filcandidat: any;
  fils: any;
  filsApostuler: any;
  myformData: any = new FormData();
  isDiplome = true;
  selectedDiplome = '';
  filvalue: any;
  premierchoix: any;
  deuxiemechoix: any;
  memechoix: boolean | undefined;
  bacs$: BehaviorSubject<any> = new BehaviorSubject<any>(null);


  constructor(
    private formBuilder: FormBuilder,
    private service: ApiServiceService,
    private toastr: ToastrService,
    private router: Router

  ) { }

  ngOnInit() {


    this.service.getAllfils().subscribe((result: { data: any; }) => {
      // console.log(result);
      this.fils = result.data;
      // this.fils$.next(result.data);

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
      // nomFr: ['',],
      // prenomFr: ['',],
      // nomAr: ['',],
      // prenomAr: ['',],
      // email: ['',],
      // phone: ['',],
      // cin: ['',],
      // LieuDeNaissance: ['',],
      // datenaiss: ['',],
      // cne: ['',]

    });

    this.addressDetails = this.formBuilder.group({
      // city: ['', Validators.required],
      // address: ['', Validators.required],
      // codePostal: ['', Validators.required],
      city: ['',],
      address: ['',],
      codePostal: ['',],

    });

    this.education = this.formBuilder.group({
      bac: ['', Validators.required],
      notebac: ['', Validators.required],
      anneebac: ['', Validators.required],

      diplome: ['', Validators.required],
      annediplo: ['', Validators.required],
      notediplo: ['', Validators.required],
      filC: ['', Validators.required],


      // bac: ['',],
      // notebac: ['',],
      // anneebac: ['',],

      // diplome: ['',],
      // filC: ['',],
      // annediplo: ['',],
      // notediplo: ['',],


    });
    this.accepted = this.formBuilder.group({
      acceptTerms: [false, Validators.requiredTrue]
    });
    this.choices = this.formBuilder.group({

      filterN1: ['', Validators.required],
      filterN2: ['',]

    })
    this.files = this.formBuilder.group({

      file1: ['', Validators.required],

    })
  }

  get personal() { return this.personalDetails.controls; }

  get address() { return this.addressDetails.controls; }

  get education_() { return this.education.controls; }
  get f() { return this.accepted.controls; }
  get choix() { return this.choices.controls; }
  get files_() { return this.files.controls; }
  next() {

    if (this.step == 1) {
      this.personal_step = true;
      if (this.personalDetails.invalid) { return }
      this.step++
    }

    else if (this.step == 2) {

      this.service.getAllbacs().subscribe((result: { data: any; }) => {
        // this.readData = result.data;
        console.log(result.data);
        
        this.bacs$.next(result.data);

      })
      this.service.getAlldips().subscribe((result: { data: any; }) => {
        // console.log(result);
        this.diplomes = result.data;
      });
      this.address_step = true;
      if (this.addressDetails.invalid) { return }
      this.step++;
    }
    else if (this.step == 3) {

      this.education_step = true;
      if (this.education.invalid) { return }
      this.step++;
    }
    else if (this.step == 4) {

      this.choix_step = true;
      if (this.choices.invalid) { return }
      this.step++;
    }


  }

  previous() {
    this.step--

    // if (this.step == 1) {
    //   this.address_step = false;
    // }
    // if (this.step == 2) {
    //   this.education_step = false;
    // }

  }



  submit() {

    if (this.step == 5) {
      this.choix_step = true;
      if (this.choices.invalid) { return }
      //  personalDetails
      //   this.myformData.append("nomFr", this.personalDetails.controls.nomFr.value);
      //   this.myformData.append("prenomFr", this.personalDetails.controls.prenomFr.value);
      //   this.myformData.append("nomAr", this.personalDetails.controls.nomAr.value);
      //   this.myformData.append("prenomAr", this.personalDetails.controls.prenomAr.value);
      //   this.myformData.append("email", this.personalDetails.controls.email.value);
      //   this.myformData.append("Tel", this.personalDetails.controls.phone.value);
      //   this.myformData.append("CIN", this.personalDetails.controls.cin.value);
      //   this.myformData.append("LieuDeNaissance", this.personalDetails.controls.LieuDeNaissance.value);
      //   this.myformData.append("DateDeNaissance", this.personalDetails.controls.datenaiss.value);
      //   this.myformData.append("CNE", this.personalDetails.controls.cne.value);
      //   // addressDetails
      //   this.myformData.append("Adresse", this.addressDetails.controls.address.value +
      //     ", " + this.addressDetails.controls.city.value + ", " +
      //     this.addressDetails.controls.codePostal.value)

      //   //education
      //   this.myformData.append("IntituleBAC", this.education.controls.bac.value.id);
      //   this.myformData.append("notebac", this.education.controls.notebac.value);
      //   this.myformData.append("anneebac", this.education.controls.anneebac.value);
      //   this.myformData.append("DiplomeObtenu", this.education.controls.diplome.value);
      //   this.myformData.append("IntituleFiliere", this.education.controls.filC.value);
      //   this.myformData.append("annediplo", this.education.controls.annediplo.value);
      //   this.myformData.append("notediplo", this.education.controls.notediplo.value);

      //   //attestation
      //   this.myformData.append("atessterSurhoneur", this.accepted.controls.acceptTerms.value);
      //   // choix
      //   this.myformData.append("choix1", this.choices.controls.filterN1.value.id);
      //   this.myformData.append("choix2", this.choices.controls.filterN2.value.id);

      //   // for (var pair of this.myformData.entries()) {
      //   //   console.log(pair[0] + ', ' + pair[1]);
      //   // }
      //   console.table(Object.fromEntries(this.myformData));
      //   // this.service.sendcandidatData(Object.fromEntries(this.myformData));
      //   const dataC=Object.fromEntries(this.myformData);
      //   this.service.sendcandidatData(dataC).subscribe(data =>{

      //     console.log(data);
      //     this.router.navigate(['/submitted']);



      //   });


      console.table(this.personalDetails.value);
      console.table(this.addressDetails.value);
      // console.table(this.personalDetails.value);s
      const data={"perso":this.personalDetails.value,"add": this.addressDetails.value}
      console.log(data);
      this.service.sendcandidatData(data).subscribe(data =>{

            // console.log(data);
            this.router.navigate(['/submitted']);
  
  
  
          });
  
      
      
    }
  }
  onDiplomeChange(Diplomevalue: any) {
    console.log(" diplome changeeeeeeeeed");

    if (Diplomevalue != "") {
      this.service.getAllfilsCById(Diplomevalue).subscribe((result: { data: any; }) => {
        console.log(result);
        this.filcandidat = result.data;
        this.isDiplome = false;
      })

    } else {
      this.isDiplome = true;
      this.filcandidat = [];
    }


  }

  onFiliereChange(Filvalue: any) {

    console.log(Filvalue);

    this.service.getfilApotulerById(Filvalue).subscribe((result: { data: any; }) => {
      if (result.data.length == 0) {
        this.peuxpostuler = false;
        console.log("emptyyyyyyyyyyyyyyyy");

      }
      else {
        this.filsApostuler = result.data;
        this.peuxpostuler = true;
        console.log("not emptyyyyyyyyyyyyyyyy");



      }
    })


  }
  PremierchoixChange(premierchoix: any) {
    this.premierchoix = premierchoix.id;

  }
  deuxiemechoixChange(deuxiemechoix: any) {
    if (this.premierchoix == deuxiemechoix.id) {
      this.memechoix = true;

    }
    else {
      this.memechoix = false;

    }
  }


}
