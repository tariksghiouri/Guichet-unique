import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiServiceService } from '@app/api-service.service';
import { AccountService, AlertService } from '@app/_services';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.less']
})
export class EditFormComponent implements OnInit {
  submitted = false;
  DateDeNaissance
  editForm: FormGroup;
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
  bacs: any;
  userDetials: any;
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  fileInfos?: Observable<any>;
  etablissements: any;
  account = this.accountService.accountValue;
  candidature = [] || null;
  IntituleBAC: any
  DiplomeObtenu: any
  IntituleFiliere: any
  Etablissement: any
  ville: any
  choix1: any
  choix2: any
  constructor(private alertService: AlertService, private accountService: AccountService, private api: ApiServiceService, private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {

    this.api.getUserCandudatures(this.account.id).subscribe((result: { data: any; }) => {

      console.log(result.data);

      this.candidature = result.data;
      this.DateDeNaissance = this.candidature[0].DateDeNaissance.slice(0, 10);
      this.api.getBacById(this.candidature[0].IntituleBAC).subscribe((result: { data: any; }) => {
        this.IntituleBAC = result.data

      });
      console.log(this.candidature[0].IntituleFiliere);
      this.editForm = this.formBuilder.group(
        {
          numCandidature: [this.account.id,],
          firstName: ['', Validators.required],
          lastName: ['', Validators.required],
          firstNameAr: ['', Validators.required],
          lastNameAr: ['', Validators.required],
          dob: ['', Validators.required],
          email: ['', [Validators.required, Validators.email]],
          telephone: ['', Validators.required],
          LieuDeNaissance: ['', Validators.required],
          CIN: ['', Validators.required],
          CNE: ['', Validators.required],
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
          Adresse: ['', Validators.required],


        }
      );




    });
    this.api.getAllbacs().subscribe((result: { data: any; }) => {
      this.bacs = result.data;

    })
    this.api.getAlldips().subscribe((result: { data: any; }) => {
      this.diplomes = result.data;
    });

  }
  get f() {
    return this.editForm.controls;
  }
  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }
  upload(): void {
    this.progress = 0;
    if (this.selectedFiles) {
      for (let i = 0; i < this.selectedFiles.length; ++i) {
        const file: File | null = this.selectedFiles[i];
        if (file) {
          this.currentFile = file;
          this.api.upload(this.currentFile, i).subscribe({
            next: (event: any) => {
              if (event.type === HttpEventType.UploadProgress) {
                this.progress = Math.round(100 * event.loaded / event.total);
              } else if (event instanceof HttpResponse) {
                this.message = event.body.message;
                this.fileInfos = this.api.getFiles();
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
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    // if (this.editForm.invalid) {
    //   window.scrollTo(0, 0);
      this.alertService.error("vous devez remplir tous les champs");
      // return;
    // }

 
    this.api.EditcandidatData(this.editForm.value).subscribe((res: any) => {

      if (res.success == true) {

        window.scrollTo(0, 0);
        this.alertService.success("vous avez mis à jour votre application avec succès");
      }
      else{
        window.scrollTo(0, 0);
        this.alertService.error(res.message);
      }



    });


  }
  onReset() {
    this.submitted = false;
    this.editForm.reset();
  }
  onDiplomeChange(Diplomevalue: any) {
    // console.log(Diplomevalue);
    // console.table(Diplomevalue.data);


    if (Diplomevalue != "") {
      this.api.getAllfilsCById(Diplomevalue.id).subscribe((result: { data: any; }) => {
        console.log(result);
        this.filcandidat = result.data;
        this.isDiplome = false;
      })
      this.api.getetablissementByIdDiplome(Diplomevalue.id).subscribe((result: { data: any; }) => {
        console.log(result);
        this.etablissements = result.data;
      })

    }


  }

  onFiliereChange(Filvalue: any) {

    console.log(Filvalue.id);

    this.api.getfilApotulerById(Filvalue.id).subscribe((result: { data: any; }) => {
      if (result.data.length == 0) {
        console.log("empty");

      }
      else {
        this.filsApostuler = result.data;
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
