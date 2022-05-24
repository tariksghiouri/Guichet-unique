import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ApiServiceService } from '@app/api-service.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.less']
})
export class EditFormComponent implements OnInit {
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
  constructor( private service: ApiServiceService,) { }

  ngOnInit(): void {
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
      this.service.sendcandidatData(data).subscribe(res => {

        console.log(res);
        
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
      this.service.getetablissementById(Diplomevalue.id).subscribe((result: { data: any; }) => {
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
