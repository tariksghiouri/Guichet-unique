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
  oneCandidature: any;
  selectedCandidature: any;
  candidatureSelected: boolean;
  constructor(private alertService: AlertService, private accountService: AccountService, private api: ApiServiceService, private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {

    this.api.getUserCandudatures().subscribe((result: { data: any; }) => {

      console.log(result.data);

      this.candidature = result.data;
     
      console.log(this.candidature[0].IntituleFiliere);
      this.editForm = this.formBuilder.group(
        {
          NumcondidatureReel: ['',],
          firstName: ['', Validators.required],
          lastName: ['', Validators.required],
          firstNameAr: ['', Validators.required],
          lastNameAr: ['', Validators.required],
          dob: ['', Validators.required],
          email: ['', [Validators.required, Validators.email]],
          telephone: ['', Validators.required],
          LieuDeNaissance: ['', Validators.required],
          CIN: ['', Validators.required],
          CNE: [this.candidature[0].CNE, ],
          Bac: ['', Validators.required],
          anneBac: [this.candidature[0].Anneebac, Validators.required],
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

 
  onSubmit() {
    console.log(this.editForm.value);
    
    this.submitted = true;
    // stop here if form is invalid
    if (this.editForm.invalid) {
      window.scrollTo(0, 0);
      this.alertService.error("vous devez remplir tous les champs");
      return;
    }

 
    this.api.EditcandidatData(this.editForm.value).subscribe((res: any) => {

      if (res.success == true) {

        window.scrollTo(0, 0);
        this.alertService.success("vous avez mis à jour votre application avec succès");
      }
      else{
        window.scrollTo(0, 0);
        // this.alertService.error(res.message);
      }



    });


  }
  onReset() {
    this.submitted = false;
    this.editForm.reset();
  }
  onDiplomeChange(Diplomevalue: any) {
    console.log(Diplomevalue.id);
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
  OncandidatureChange(canValue) {
    
    this.selectedCandidature = canValue.target.value;
    this.editForm.patchValue({
      NumcondidatureReel: Number(this.selectedCandidature),
    });
    this.candidatureSelected = true
    console.log(this.selectedCandidature);


    this.api.getUserCandudatureByRealNumero(this.selectedCandidature).subscribe((result: { data: any; }) => {

        this.oneCandidature = result.data
        this.DateDeNaissance = this.oneCandidature[0].DateDeNaissance.slice(0, 10);
        this.api.geIntituleFilierebyid(this.oneCandidature[0].IntituleFiliere).subscribe((result: { data: any; }) => {
            this.IntituleFiliere = result.data
            console.log(this.IntituleFiliere);

        });
        this.api.getBacById(this.oneCandidature[0].IntituleBAC).subscribe((result: { data: any; }) => {
            this.IntituleBAC = result.data

        });
        this.api.getchoixById(this.oneCandidature[0].choix1).subscribe((result: { data: any; }) => {
            this.choix1 = result.data

        });
        this.api.getchoixById(this.oneCandidature[0].choix2).subscribe((result: { data: any; }) => {
            this.choix2 = result.data

        });
        this.api.geEtablissementById(this.oneCandidature[0].Etablissement).subscribe((result: { data: any; }) => {
            this.Etablissement = result.data

        });



    });

   

}
}
