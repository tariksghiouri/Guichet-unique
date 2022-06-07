import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiServiceService } from '@app/api-service.service';
import { AlertService } from '@app/_services';

@Component({
  selector: 'app-les-dates',
  templateUrl: './les-dates.component.html',
  styleUrls: ['./les-dates.component.less']
})
export class LesDatesComponent implements OnInit {
  editdates: FormGroup;
  lesDates: any;
  submitted = false;
  mDebutCandidatures: any;
  mFinCandidatures: any;
  mDebutPreselection: any;
  mFinPreselection: any;
  mTest: any;
  mInscriptionsListP: any;
  mInscriptionsListAtt: any;

  constructor(private formBuilder: FormBuilder,private alertService: AlertService, private api: ApiServiceService) { }

  ngOnInit(): void {
    
    this.api.getDatesFormated().subscribe((result: { data: any; }) => {

      console.log(result);
        this.lesDates = result;
        // this.mDebutCandidatures = this.lesDates[0].DebutCandidatures.slice(0, 10);
        // this.mFinCandidatures = this.lesDates[0].FinCandidatures.slice(0, 10);
        // this.mDebutPreselection = this.lesDates[0].DebutPreselection.slice(0, 10);
        // this.mFinPreselection = this.lesDates[0].FinPreselection.slice(0, 10);
        // this.mTest = this.lesDates[0].Test.slice(0, 10);
        // this.mInscriptionsListP = this.lesDates[0].InscriptionsListP.slice(0, 10);
        // this.mInscriptionsListAtt = this.lesDates[0].InscriptionsListAtt.slice(0, 10);
        this.mDebutCandidatures = this.lesDates[0].DebutCandidatures;
        this.mFinCandidatures = this.lesDates[0].FinCandidatures;
        this.mDebutPreselection = this.lesDates[0].DebutPreselection;
        this.mFinPreselection = this.lesDates[0].FinPreselection;
        this.mTest = this.lesDates[0].Test;
        this.mInscriptionsListP = this.lesDates[0].InscriptionsListP;
        this.mInscriptionsListAtt = this.lesDates[0].InscriptionsListAtt;
        console.log(this.mDebutCandidatures);
        console.log(this.mFinCandidatures);
        console.log(this.mDebutPreselection);
        console.log(this.mFinPreselection);
        console.log(this.mTest);
        console.log(this.mInscriptionsListP);
        console.log(this.mInscriptionsListAtt);
      
    });
    this.editdates = this.formBuilder.group(
      {
        DebutCandidatures: ['', Validators.required],
        FinCandidatures: ['', Validators.required],
        DebutPreselection: ['', Validators.required],
        FinPreselection: ['', Validators.required],
        Test: ['', Validators.required],
        InscriptionsListP: ['', Validators.required],
        InscriptionsListAtt: ['', Validators.required]


      });
    

  }
  onSubmit() {
    this.submitted = true;
    if (this.editdates.invalid) {
      this.alertService.error("vous devez remplir tous les champs");
      return;
    }
    this.api.EditDates(this.editdates.value).subscribe((res: any) => {

      if (res.success == true) {

        window.scrollTo(0, 0);
        this.alertService.success("vous avez mis à jour les dates avec succès");
      }
      else{
        window.scrollTo(0, 0);
        this.alertService.error(res.message);
      }
    })

  } 
 public get f() {
    return this.editdates.controls;
  }
  onReset() {
    this.submitted = false;
    this.editdates.reset();
  }

}
