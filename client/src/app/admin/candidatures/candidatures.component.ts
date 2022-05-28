import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '@app/api-service.service';
import { Alert } from '@app/_models';
interface candidat {
  Numcondidature: number;
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
  searchTerm: string;
  page = 1;
  pageSize = 4;
  collectionSize: number;
  candidats;
  allcandidats ;
  constructor(private api: ApiServiceService) { }
  downloadCSV(){
    let listdesCandidats: any;
    this.api.getCleanCandidatsList().subscribe((candidats: any) => {
      listdesCandidats =candidats;
      this.downloadCSVFromJson('listdesCandidats.csv', listdesCandidats);

      
    })

  }
  ngOnInit(): void {
    this.api.getAllCandidats().subscribe((res: any) => {
      this.collectionSize = res.data.length;
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
  link.setAttribute('href', 'data:text/csv;charset=utf-8,%EF%BB%BF' + encodeURIComponent(csv));
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
}
