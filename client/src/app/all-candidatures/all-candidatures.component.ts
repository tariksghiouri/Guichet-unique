import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '@app/api-service.service';

@Component({
  selector: 'app-all-candidatures',
  templateUrl: './all-candidatures.component.html',
  styleUrls: ['./all-candidatures.component.less']
})
export class AllCandidaturesComponent implements OnInit {
  nombreCanidats: any;
  candidats: any;
  allcandidats: any;
  allfilsraw: any;
  allfils = [];
  searchTerm: string;
  collectionSize: number;

  constructor(private api: ApiServiceService) { }
  getAllchoices() {
    this.api.getAllchoices().subscribe((res: any) => {
      this.allfilsraw = res
      for (var i in res) {
        this.allfils[res[i].id] = res[i].Intitule
      }
      console.log(this.allfils);
      

    })
  }
  ngOnInit(): void {
    this.getAllchoices();
    this.api.getAllCandidats().subscribe((res: any) => {
      this.nombreCanidats = res.data.length;
      this.candidats = res.data;
      this.allcandidats = this.candidats;
  

    });
  }
  search(value: string): void {
    this.candidats = this.allcandidats.filter((val) =>String(val.NumcondidatureReel).toLowerCase().includes(value));
    this.collectionSize = this.candidats.length;
  }

}
