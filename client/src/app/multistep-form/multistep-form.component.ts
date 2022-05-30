import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiServiceService } from '../api-service.service';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { AccountService, AlertService } from '@app/_services';


@Component({
  selector: 'app-multistep-form',
  templateUrl: './multistep-form.component.html',
  styleUrls: ['./multistep-form.component.css']
})
export class MultistepFormComponent implements OnInit {
  noCondidature=true;
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
  isetablissement = true;
  selectedDiplome = '';
  filvalue: any;
  premierchoix: any;
  deuxiemechoix: any;
  memechoix: boolean | undefined;
  bacs$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  userDetials: any;
  // file upload vars
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  fileInfos?: Observable<any>;
  etablissements: any;

  constructor(
    private formBuilder: FormBuilder,
    private service: ApiServiceService,
    private router: Router,
    private accountService: AccountService,
    private alertService: AlertService

  ) { }

  ngOnInit() {

  //   this.service.getUserCandudatures(this.userDetials.id).subscribe((result: { data: any; }) => {
  //     if(!Object.keys(result.data).length){
  //         this.noCondidature=true;
  //     }
  //     else{
  //         this.noCondidature=false;
  //     }
  // });
    this.userDetials=this.accountService.accountValue
    console.log(this.userDetials.id);
    
        this.service.getAllfils().subscribe((result: { data: any; }) => {
      // console.log(result);
      this.fils = result.data;
      // this.fils$.next(result.data);

    })


    this.personalDetails = this.formBuilder.group({
      // nomFr: ['', Validators.required],
      // prenomFr: ['', Validators.required],
      // nomAr: ['', Validators.required],
      // prenomAr: ['', Validators.required],
      // email: [this.userDetials.email, Validators.required],
      // phone: ['', Validators.required],
      // cin: ['', <any>[Validators.required, Validators.minLength(10)]],
      // LieuDeNaissance: ['', Validators.required],
      // datenaiss: ['', Validators.required],
      // cne: ['', Validators.required],
      nomFr: ['',],
      prenomFr: ['',],
      nomAr: ['',],
      prenomAr: ['',],
      email: [this.userDetials.email,],
      phone: ['',],
      cin: ['',],
      LieuDeNaissance: ['',],
      datenaiss: ['',],
      cne: ['',]

    });

    this.addressDetails = this.formBuilder.group({
      //  city: ['', Validators.required],
      // address: ['', Validators.required],
      // codePostal: ['', Validators.required],
      city: ['',],
      address: ['',],
      codePostal: ['',],

    });

    this.education = this.formBuilder.group({
      // bac: ['', Validators.required],
      // notebac: ['', Validators.required],
      // anneebac: ['', Validators.required],
      // diplome: ['', Validators.required],
      // annediplo: ['', Validators.required],
      // notediplo: ['', Validators.required],
      // filC: ['', Validators.required],
      // etablissement: ['',Validators.required],



      bac: ['',],
      notebac: ['',],
      anneebac: ['',],

      diplome: ['',],
      filC: ['',],
      etablissement: ['',],
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

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  upload(): void {
    this.progress = 0;
    if (this.selectedFiles) {
      for (let i = 0; i < this.selectedFiles.length; ++i) {
        const file: File | null  = this.selectedFiles[i];
        if (file) {
          this.currentFile = file;
          this.service.upload(this.currentFile, i).subscribe({
            next: (event: any) => {
              if (event.type === HttpEventType.UploadProgress) {
                this.progress = Math.round(100 * event.loaded / event.total);
              } else if (event instanceof HttpResponse) {
                this.message = event.body.message;
                this.fileInfos = this.service.getFiles();
              }
            },
            error: (err: any) => {
              console.log(err);
              this.progress = 0;
              if (err.error && err.error.message) {
                this.message = err.error.message;
              } else {
                this.message = 'Could not upload the file!';
              }
              this.currentFile = undefined;
            }
          });
        }
    }
  
      // this.selectedFiles = undefined;
    }
  }

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
      // console.table(this.personalDetails.value);
      // console.table(this.addressDetails.value);
      // console.table(this.personalDetails.value);
      const data = {
        user: this.userDetials.id,
        personelinfos: this.personalDetails.value,
        address: this.addressDetails.controls.address.value + ", " 
                  +this.addressDetails.controls.city.value + ", "
                  +this.addressDetails.controls.codePostal.value,
        education: this.education.value,
        choices: this.choices.value
      }
      console.log(this.userDetials.id);
      
      console.table(data);
      this.service.sendcandidatData(data).subscribe((res:any) => {

        if (res.success == true) {

          window.scrollTo(0, 0);
          this.alertService.success("vous avez mis à jour votre application avec succès");
          // this.router.navigate(['/confirmation']);
          this.router.navigate(['/submitted']);
        }
        else{
          window.scrollTo(0, 0);
          this.alertService.error(res.message);
        

        }
        
        // this.router.navigate(['/confirmation']);



      });




    }
        // this.router.navigate(['/confirmation'])
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
      this.service.getetablissementByIdDiplome(Diplomevalue.id).subscribe((result: { data: any; }) => {
        console.log(result);
        this.etablissements = result.data;
        this.isetablissement = false;
      })

    } else {
      this.isDiplome = true;
      this.filcandidat = [];
      this.isetablissement = true;
      this.etablissements = [];
    }


  }

  onFiliereChange(Filvalue: any) {

    // console.log(Filvalue);

    this.service.getfilApotulerById(Filvalue.id).subscribe((result: { data: any; }) => {
      if (result.data.length == 0) {
        this.peuxpostuler = false;
        // console.log("emptyyyyyyyyyyyyyyyy");

      }
      else {
        this.filsApostuler = result.data;
        this.peuxpostuler = true;
        // console.log("not emptyyyyyyyyyyyyyyyy");



      }
    })


  }

  onBacChange(bac: any) {
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
