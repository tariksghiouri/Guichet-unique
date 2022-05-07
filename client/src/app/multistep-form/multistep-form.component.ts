import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
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
  choices!:FormGroup;
  personal_step = false;
  address_step = false;
  education_step = false;
  choix_step = false;
  accepted!:FormGroup;
  step = 1;
  readData: any;
  diplomes: any;
  filcandidat: any;
  fils: any;
  myformData: any = new FormData();
  isDiplome=true;
  selectedDiplome = '';

  
  constructor(private formBuilder: FormBuilder, private service: ApiServiceService,     private toastr: ToastrService,
   
    ) { }

  ngOnInit() {
  
    this.service.getAlldips().subscribe((result: { data: any; }) => {
      // console.log(result);
      this.diplomes = result.data;
    });
    this.service.getAllfils().subscribe((result: { data: any; }) => {
      // console.log(result);
      this.fils = result.data;
    })
  
    

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
      nomFr: ['', ],
      prenomFr: ['', ],
      nomAr: ['', ],
      prenomAr: ['',],
      email: ['', ],
      phone: ['', ],
      cin: ['', ],
      LieuDeNaissance: ['', ],
      datenaiss: ['', ],
      cne: ['', ]

    });

    this.addressDetails = this.formBuilder.group({
      // city: ['', Validators.required],
      // address: ['', Validators.required],
      // codePostal: ['', Validators.required],
      city: ['', ],
      address: ['', ],
      codePostal: ['', ],

    });

    this.education = this.formBuilder.group({
      bac: ['', Validators.required],
      notebac: ['', Validators.required],
      anneebac: ['', Validators.required],

      diplome: ['', Validators.required],
      annediplo: ['', Validators.required],
      notediplo: ['', Validators.required],
      // bac: ['', ],
      // notebac: ['', ],
      // anneebac: ['', ],

      // diplome: ['', ],
      // filC:['',],
      // annediplo: ['', ],
      // notediplo: ['', ],


    });
    this.accepted= this.formBuilder.group({
      acceptTerms: [false, Validators.requiredTrue]
    });
    this.choices=this.formBuilder.group({

      filterN1: ['', Validators.required],
      filterN2: ['', ]

    })
  }

  get personal() { return this.personalDetails.controls; }

  get address() { return this.addressDetails.controls; }

  get education_() { return this.education.controls; }
  get f() { return this.accepted.controls; }
  get choix() { return this.choices.controls; }
  next() {

    if (this.step == 1) {
      this.personal_step = true;
      if (this.personalDetails.invalid) { return }
      this.step++
    }

    else if (this.step == 2) {
      this.service.getAllbacs().subscribe((result: { data: any; }) => {
        // console.log(result);
        this.readData = result.data;
      })
      this.address_step = true;
      if (this.addressDetails.invalid) { return }
      this.step++;
    }
    else if (this.step == 3) {
      
      this.education_step = true;
      if (this.education.invalid) { return }
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



  submit() {

    if (this.step == 4) {
      this.choix_step = true;
      if (this.choices.invalid) { return }
      //  personalDetails
      this.myformData.append("nomFr", this.personalDetails.controls.nomFr.value);
      this.myformData.append("prenomFr", this.personalDetails.controls.prenomFr.value);
      this.myformData.append("nomAr", this.personalDetails.controls.nomAr.value);
      this.myformData.append("prenomAr", this.personalDetails.controls.prenomAr.value);
      this.myformData.append("email", this.personalDetails.controls.email.value);
      this.myformData.append("phone", this.personalDetails.controls.phone.value);
      this.myformData.append("cin", this.personalDetails.controls.cin.value);
      this.myformData.append("LieuDeNaissance", this.personalDetails.controls.LieuDeNaissance.value);
      this.myformData.append("datenaiss", this.personalDetails.controls.datenaiss.value);
      this.myformData.append("cne", this.personalDetails.controls.cne.value);
      // addressDetails
      this.myformData.append("address", this.addressDetails.controls.address.value+
                                ", "+ this.addressDetails.controls.city.value +", "+
                               this.addressDetails.controls.codePostal.value)
                            
      //education
      this.myformData.append("bac", this.education.controls.bac.value.id);
      this.myformData.append("notebac", this.education.controls.notebac.value);
      this.myformData.append("anneebac", this.education.controls.anneebac.value);
      this.myformData.append("diplome", this.education.controls.diplome.value.id);
      this.myformData.append("filC", this.education.controls.filC.value.id);
      this.myformData.append("annediplo", this.education.controls.annediplo.value);
      this.myformData.append("notediplo", this.education.controls.notediplo.value);

      // this.toastr.show(this.choices.controls.filterN1.value);
      this.toastr.show(Object.fromEntries(this.myformData).toString())
    }
  }
  onDiplomeChange(Diplomevalue: any){
        
    if (Diplomevalue!="") {
      this.service.getAllfilsCById(Diplomevalue).subscribe((result: { data: any; }) => {
        // console.log(result);
        this.filcandidat = result.data;
        this.isDiplome=false;
      })
      
    }else{
      this.isDiplome=true;
      this.filcandidat=[];
    }
    
 
  }
  
}
