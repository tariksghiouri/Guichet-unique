import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiServiceService } from '../api-service.service';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { AccountService, AlertService, TimeService } from '@app/_services';


@Component({
  selector: 'app-multistep-form',
  templateUrl: './multistep-form.component.html',
  styleUrls: ['./multistep-form.component.css']
})
export class MultistepFormComponent implements OnInit {

  noCondidature = true;
  personalDetails!: FormGroup;
  addressDetails!: FormGroup;
  education!: FormGroup;
  choices!: FormGroup;
  files!: FormGroup;
  secondCanidature!: FormGroup;
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
  numberOfcandidatures: any;
  SecondFormSubmitted = false;
  //second Candidatures DAATA vars
  DateDeNaissance: any;
  SecondBacs:any
  Seconddiplomes
  SecondFildiplome
  SecondEtablissement
  SecondfilsApostuler
  Secondpeuxpostuler: boolean;
  Secondfilcandidat: any;
  Secondetablissements: any;
  // ilResteDutemps: any;
  //  SecondSecondChoice
  Docsuploaded:boolean=false



  constructor(
    private formBuilder: FormBuilder,
    private service: ApiServiceService,
    private router: Router,
    private accountService: AccountService,
    private alertService: AlertService,
    public time:TimeService
  ) { }

  ngOnInit() {
    this.time.isTimeUp()

    
    this.userDetials = this.accountService.accountValue
    this.service.getAllbacs().subscribe((result: { data: any; }) => {
      this.SecondBacs = result.data;
      

    })
    this.service.getAlldips().subscribe((result: { data: any; }) => {
      // console.log(result);
      this.Seconddiplomes = result.data;
    });
    this.service.getUserCandudatures().subscribe((result: { data: any; }) => {

      let oldCandidature = result.data;
      let DateDeNaissance = oldCandidature[0].DateDeNaissance.slice(0, 10);

      this.secondCanidature = this.formBuilder.group(
        {
          IdCompte: [this.userDetials.id],
          firstName: [oldCandidature[0].prenomFr, Validators.required],
          lastName: [oldCandidature[0].nomFr, Validators.required],
          firstNameAr: [oldCandidature[0].prenomAr, Validators.required],
          lastNameAr: [oldCandidature[0].nomAr, Validators.required],
          dob: [DateDeNaissance, Validators.required],
          email: [oldCandidature[0].email, Validators.required],
          telephone: [oldCandidature[0].Tel, Validators.required],
          LieuDeNaissance: [oldCandidature[0].LieuDeNaissance, Validators.required],
          CIN: [oldCandidature[0].CIN, Validators.required],
          CNE: [oldCandidature[0].CNE, Validators.required],
          Adresse: [oldCandidature[0].Adresse, Validators.required],
          Bac: ['', Validators.required],
          anneBac: ['', Validators.required],
          noteBac: ['', Validators.required],
          diplome: ['', Validators.required],
          filiereDip: ['', Validators.required],
          etablissement: ['', Validators.required],
          MoyenneDiplome: ['', Validators.required],
          AnneeDiplome: ['', Validators.required],
          choix1: ['', Validators.required],
          choix2: ['', Validators.required],


        }
      );




    });

    this.service.getNumberOfCandidatures(this.userDetials.id).subscribe((result: { data: any; }) => {
      // console.log(result[0].numberOfcandidatures);
      this.numberOfcandidatures = result[0].numberOfcandidatures;

    });



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
      email: [this.userDetials.email, [Validators.required,Validators.email]],
      phone: ['', [ Validators.required,
        Validators.pattern("^[0-9]*$"),
        Validators.minLength(10), Validators.maxLength(10)]],
      cin: ['', Validators.required],
      LieuDeNaissance: ['', Validators.required],
      datenaiss: ['', Validators.required],
      cne: ['', [Validators.required,Validators.pattern("^[a-zA-Z][0-9]+$"),Validators.minLength(9), Validators.maxLength(10)]],
      // nomFr: ['', ],
      // prenomFr: ['', ],
      // nomAr: ['', ],
      // prenomAr: ['', ],
      // email: [this.userDetials.email, ],
      // phone: ['', ],
      // cin: ['', ],
      // LieuDeNaissance: ['', ],
      // datenaiss: ['', ],
      // cne: ['', ],
 

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
      bac: ['', Validators.required],
      notebac: ['', [Validators.required, Validators.min(1), Validators.max(20)]],
      anneebac: ['', Validators.required],
      diplome: ['', Validators.required],
      annediplo: ['', Validators.required],
      notediplo: ['', [Validators.required, Validators.min(1), Validators.max(20)]],
      filC: ['', Validators.required],
      etablissement: ['',Validators.required],
      // bac: ['', ],
      // notebac: ['', ],
      // anneebac: ['', ],
      // diplome: ['', ],
      // annediplo: ['', ],
      // notediplo: ['', ],
      // filC: ['', ],
      // etablissement: ['',],


      


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
  onSecondCandidatureSubmit() {
    console.log(this.secondCanidature.value);

    this.SecondFormSubmitted = true;
    // stop here if form is invalid
    if (this.secondCanidature.invalid) {
      window.scrollTo(0, 0);
      this.alertService.error("vous devez remplir tous les champs");
      return;
    }
    else{
      this.service.sendSecondcandidatData(this.secondCanidature.value).subscribe((result:any)=>{
        if (result.success == true) {

          window.scrollTo(0, 0);
          this.alertService.success("vous Ajouter votre Deuxieme application avec succès voir => <b> <a [routerLink]='/profile/mesCandidatures'> profile</a></b>");
          // this.router.navigate(['/confirmation']);
          setTimeout(() => {
            this.router.navigate(['profile/mesCandidatures']);
        }, 3000);  //3s
        }
        else {
          window.scrollTo(0, 0);
          this.alertService.error(result.message);


        }
        
      })
    }
  }

  upload(): void {
    this.progress = 0;
    if (this.selectedFiles) {
      for (let i = 0; i < this.selectedFiles.length; ++i) {
        const file: File | null = this.selectedFiles[i];
        if (file) {
          this.currentFile = file;
          this.service.upload(this.currentFile, i).subscribe({
            next: (event: any) => {
              if (event.type === HttpEventType.UploadProgress) {
                this.progress = Math.round(100 * event.loaded / event.total);
              } else if (event instanceof HttpResponse) {
                  this.Docsuploaded=true
                this.message = event.body.message;
                this.alertService.info(event.body.message);
                this.fileInfos = this.service.getFiles();
              }
            },
            error: (err: any) => {
              console.log(err);
              
              if (err.error && err.error.message) {
                this.alertService.error(err.error.message);
              } else {
                this.alertService.error("Impossible d'uploader le fichier verifier la taille (max 2MB)!");
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

      const data = {
        user: this.userDetials.id,
        personelinfos: this.personalDetails.value,
        address: this.addressDetails.controls.address.value + ", "
          + this.addressDetails.controls.city.value + ", "
          + this.addressDetails.controls.codePostal.value,
        education: this.education.value,
        choices: this.choices.value
      }
      // console.log(this.userDetials.id);
      // console.table(data);
      // this.upload();
      if (this.Docsuploaded) {
        this.service.sendcandidatData(data).subscribe((res: any) => {
        
          if (res.success == true) {
            window.scrollTo(0, 0);
            this.alertService.success("vous Ajouter votre Premiere application avec succès <a [routerLink]='/profile'> profile</a>");
            
            setTimeout(() => {
              this.router.navigate(['profile/mesCandidatures']);
          }, 3000);  //3s
          }
          else {
            window.scrollTo(0, 0);
            this.alertService.error(res.message);
  
  
          }
  
          // this.router.navigate(['/confirmation']);
  
  
  
        });
      }
     




    }
    // this.router.navigate(['/confirmation'])
  }
  onDiplomeChange(Diplomevalue: any) {

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
  onSecondDiplomeChange(Diplomevalue: any) {

    if (Diplomevalue != "") {
      this.service.getAllfilsCById(Diplomevalue.id).subscribe((result: { data: any; }) => {
        this.Secondfilcandidat = result.data;
        // this.isDiplome = false;
      })
      this.service.getetablissementByIdDiplome(Diplomevalue.id).subscribe((result: { data: any; }) => {
        console.log(result);
        this.Secondetablissements = result.data;
        // this.isetablissement = false;
      })

    } else {
      // this.isDiplome = true;
      this.Secondfilcandidat = [];
      // this.isetablissement = true;
      this.Secondetablissements = [];
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
  onSecondFiliereChange(Filvalue: any) {


    this.service.getfilApotulerById(Filvalue.id).subscribe((result: { data: any; }) => {
      if (result.data.length == 0) {
        this.Secondpeuxpostuler = false;

      }
      else {
        this.SecondfilsApostuler = result.data;
        this.Secondpeuxpostuler = true;
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
