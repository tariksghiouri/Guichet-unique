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
    candidature;
    noCondidature=true;

    ngOnInit(): void {

        this.api.getUserCandudatures(this.account.id).subscribe((result: { data: any; }) => {
            if(!Object.keys(result.data).length){
                this.noCondidature=true;
            }
            else{
                this.candidature = result.data;
                this.noCondidature=false;
            }
        });
        console.log(this.noCondidature );
        
    }
}