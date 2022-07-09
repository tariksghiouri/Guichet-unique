import { Component, OnInit, ViewChild } from '@angular/core';
import { NgModel } from '@angular/forms';
import { ApiServiceService } from '@app/api-service.service';
import {ExcelService} from '@app/_services';

interface candidat {
  IdCompte: number;
  CIN: string;
  CNE: string;
  nomFr: string;
  nomAr: string;
  prenomFr: string;
  prenomAr: string;
  email: string;
  DateDeNaissance: string;
  LieuDeNaissance: string;
  Adresse: string;
  Tel: string;
  IntituleBAC: number;
  noteBac: number;
  Anneebac: string;
  DiplomeObtenu: number;
  IntituleFiliere: number;
  Etablissement: number;
  ville: number;
  MoyenneDiplome: number;
  AnneeDiplome: string;
  choix1: number;
  choix2: number;
}@Component({
  selector: 'app-candidatures',
  templateUrl: './candidatures.component.html',
  styleUrls: ['./candidatures.component.less']
})
export class CandidaturesComponent implements OnInit {
  @ViewChild("ngModel") ngModel: NgModel;

  searchTerm: string;
  page = 1;
  pageSize = 4;
  collectionSize: number;
  candidats;
  allcandidats;
  allfils = [];
  allfilsraw;
  nombreCanidats
  selectedChoix
  selectedfilname="toutLesCandidats";

  constructor(private api: ApiServiceService, private excelService:ExcelService  ) {

   }
  downloadCSV() {
    let listdesCandidats: any;
    this.api.getCleanCandidatsList(this.selectedChoix).subscribe((candidats: any) => {
      listdesCandidats = candidats;
      
     
        this.downloadCSVFromJson(this.selectedfilname+'.xlsx', listdesCandidats);
      


    })

  }
  FiliereSelectChanged(Filvalue: any) {
    this.selectedfilname=this.allfils[Filvalue.target.value];
    if(Filvalue.target.value!=-1){
      this.selectedChoix=Filvalue.target.value;

    }
    else{
      this.selectedChoix=NaN;
      this.selectedfilname="toutLesCandidats";
    }

    if (Filvalue.target.value == -1) {
      this.api.getAllCandidats().subscribe((res: any) => {
        this.collectionSize = res.data.length;
        this.nombreCanidats = res.data.length;
        this.candidats = res.data;
        this.allcandidats = this.candidats;
    
  
      });

    } else {
      this.api.geListCandidatsparchoixId(Filvalue.target.value).subscribe((candidats: any) => {
        this.collectionSize = candidats.length;
        this.nombreCanidats = candidats.length
        this.candidats = candidats;
        this.allcandidats = this.candidats;
      })
    }



  }
  ngOnInit(): void {

    this.getAllchoices();
    console.log(this.allfils);

    this.api.getAllCandidats().subscribe((res: any) => {
      this.collectionSize = res.data.length;
      this.nombreCanidats = res.data.length;
      this.candidats = res.data;
      this.allcandidats = this.candidats;
      //  console.table(this.candidats);

      //  console.log(this.collectionSize);

    });

  }
  search(value: string): void {
    this.candidats = this.allcandidats.filter((val) => val.CNE.toLowerCase().includes(value));
    this.collectionSize = this.candidats.length;
  }


  downloadCSVFromJson = (filename, arrayOfJson) => {
    // convert JSON to CSV
    const replacer = (key, value) => value === null ? '' : value // specify how you want to handle null values here
    const header = Object.keys(arrayOfJson[0])
    let csv = arrayOfJson.map(row => header.map(fieldName =>
      JSON.stringify(row[fieldName], replacer)).join(','))
    csv.unshift(header.join(','))
    csv = csv.join('\r\n')

    // Create link and download
    var link = document.createElement('a');
    link.setAttribute('href', 'data:text/xlsx;charset=utf-8,%EF%BB%BF' + encodeURIComponent(csv));
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  getAllchoices() {
    this.api.getAllchoices().subscribe((res: any) => {
      this.allfilsraw = res
      for (var i in res) {
        this.allfils[res[i].id] = res[i].Intitule
      }

    })
  }

  exportAsXLSX():void {
    let listdesCandidats: any;
    this.api.getCleanCandidatsList(this.selectedChoix).subscribe((candidats: any) => {
      listdesCandidats = (candidats);
      
     
      this.excelService.exportAsExcelFile(listdesCandidats, this.selectedfilname);
      


    })
  }
  organise(arr) {
    var headers = [], // an Array to let us lookup indicies by group
      objs = [],    // the Object we want to create
      i, j;
    for (i = 0; i < arr.length; ++i) {
      j = headers.indexOf(arr[i].id); // lookup
      if (j === -1) { // this entry does not exist yet, init
        j = headers.length;
        headers[j] = arr[i].id;
        objs[j] = {};
        objs[j].id = arr[i].id;
        objs[j].data = [];
      }
      objs[j].data.push( // create clone
        {
          case_worked: arr[i].case_worked,
          note: arr[i].note, id: arr[i].id
        }
      );
    }
    return objs;
  }
}
