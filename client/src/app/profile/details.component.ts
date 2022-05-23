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

    ngOnInit(): void {
        this.api.getUserCandudatures(this.account.id).subscribe((result: { data: any; }) => {
            console.log(this.account.id);
            console.table(result.data)
            this.candidature = result.data;
        });
        console.log(this.candidature );
        
    }
}