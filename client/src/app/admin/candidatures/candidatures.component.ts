import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '@app/api-service.service';
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

  ngOnInit(): void {
    this.api.getAllCandidats().subscribe((res: any) => {
      this.collectionSize = res.data.length;
      this.candidats = res.data;
      this.allcandidats = this.candidats;
         console.table(this.candidats);
         console.log("  ////////////////");
         
         console.log(this.collectionSize);

    });
    
  }
  search(value: string): void {
    this.candidats = this.allcandidats.filter((val) => val.CNE.toLowerCase().includes(value));
    this.collectionSize = this.candidats.length;
  }

}
