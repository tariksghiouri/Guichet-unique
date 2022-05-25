import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '@app/api-service.service';

import { AccountService } from '@app/_services';

@Component({
    templateUrl: 'details.component.html',
    styleUrls: ['./details.component.css']

})
export class DetailsComponent implements OnInit {
    constructor(private accountService: AccountService, private api: ApiServiceService) { }


    account = this.accountService.accountValue;
    candidature: any;
    noCondidature = true;
    IntituleBAC: any
    DiplomeObtenu: any
    IntituleFiliere: any
    Etablissement: any
    ville: any
    choix1: any
    choix2: any
    ngOnInit(): void {

        this.api.getUserCandudatures(this.account.id).subscribe((result: { data: any; }) => {
            if (!Object.keys(result.data).length) {
                this.noCondidature = true;
            }
            else {
                this.candidature = result.data;
                console.log(this.candidature[0].IntituleFiliere);
                this.api.geIntituleFilierebyid(this.candidature[0].IntituleFiliere).subscribe((result: { data: any; }) => {
                    this.IntituleFiliere = result.data
                    // console.log(this.IntituleFiliere);

                });
                this.api.getBacById(this.candidature[0].IntituleBAC).subscribe((result: { data: any; }) => {
                    this.IntituleBAC = result.data

                });
                this.api.getchoixById(this.candidature[0].choix1).subscribe((result: { data: any; }) => {
                    this.choix1 = result.data

                });
                this.api.getchoixById(this.candidature[0].choix2).subscribe((result: { data: any; }) => {
                    this.choix2 = result.data

                });
                this.api.geEtablissementById(this.candidature[0].Etablissement).subscribe((result: { data: any; }) => {
                    this.Etablissement = result.data

                });
                // this.api.geIntituleFilierebyid(this.candidature[0].IntituleFiliere).subscribe((result: { data: any; }) => {
                //     this.IntituleFiliere = result.data
                //     console.log(this.IntituleFiliere);

                // });
                this.noCondidature = false;

            }



        });

        // console.log(this.noCondidature );

    }
}