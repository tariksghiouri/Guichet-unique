import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiServiceService } from '../api-service.service';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { AuthService } from '../service/auth.service';


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
  userDetials:any;


  constructor(
    private formBuilder: FormBuilder,
    private service: ApiServiceService,
    private toastr: ToastrService,
    private router: Router,
    private authService: AuthService,

  ) { }

  ngOnInit() {


    this.service.getAllfils().subscribe((result: { data: any; }) => {
      // console.log(result);
      this.fils = result.data;
      // this.fils$.next(result.data);

    })

    if (localStorage.getItem('Token')!.length>0){
      this.authService.getProfile().subscribe((result=>{
        console.log(result);
        this.userDetials= result;
        console.log(this.userDetials.data.id);

    

      }));
    }
    this.personalDetails = this.formBuilder.group({
      // nomFr: ['', Validators.required],
      // prenomFr: ['', Validators.required],
      // nomAr: ['', Validators.required],
      // prenomAr: ['', Validators.required],
      // email: ['', Validators.required],
      // phone: ['', Validators.required],
      // cin: ['', <any>[Validators.required, Validators.minLength(10)]],
      // LieuDeNaissance: ['', Validators.required],
      // datenaiss: ['', Validators.required],
      // cne: ['', Validators.required],
      nomFr: ['',],
      prenomFr: ['',],
      nomAr: ['',],
      prenomAr: ['',],
      email: ['',],
      phone: ['',],
      cin: ['',],
      LieuDeNaissance: ['',],
      datenaiss: ['',],
      cne: ['',]

    });

    this.addressDetails = this.formBuilder.group({
      city: ['', Validators.required],
      address: ['', Validators.required],
      codePostal: ['', Validators.required],
      // city: ['',],
      // address: ['',],
      // codePostal: ['',],

    });

    this.education = this.formBuilder.group({
      // bac: ['', Validators.required],
      // notebac: ['', Validators.required],
      // anneebac: ['', Validators.required],

      // diplome: ['', Validators.required],
      // annediplo: ['', Validators.required],
      // notediplo: ['', Validators.required],
      // filC: ['', Validators.required],


      bac: ['',],
      notebac: ['',],
      anneebac: ['',],

      diplome: ['',],
      filC: ['',],
      annediplo: ['',],
      notediplo: ['',],


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
      


      console.table(this.personalDetails.value);
      console.table(this.addressDetails.value);
      // console.table(this.personalDetails.value);
      const data={
        "user":this.userDetials.data.id,
        "personelinfos":this.personalDetails.value,
        "address": this.addressDetails.controls.address.value +", " + this.addressDetails.controls.city.value + ", " +
        this.addressDetails.controls.codePostal.value,
        "education" : this.education.value,
        "choices": this.choices.value

      
      }
      console.log(data);
      this.service.sendcandidatData(data).subscribe(data =>{

            // console.log(data);
            this.router.navigate(['/submitted']);
  
  
  
          });
  
      
      
    }
  }
  onDiplomeChange(Diplomevalue: any) {
    // console.log(Diplomevalue);
    // console.table(Diplomevalue.data);
    

    if (Diplomevalue != "") {
      this.service.getAllfilsCById(Diplomevalue.id).subscribe((result: { data: any; }) => {
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

    // console.log(Filvalue);

    this.service.getfilApotulerById(Filvalue.id).subscribe((result: { data: any; }) => {
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

  onBacChange(bac:any){
    console.log(bac);
    

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
