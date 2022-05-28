import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { SubNavComponent } from './subnav.component';
import { LayoutComponent } from './layout.component';
import { OverviewComponent } from './overview.component';
import { CandidaturesComponent } from './candidatures/candidatures.component';
import { ListFilterPipe } from './listFilterPipe';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        AdminRoutingModule,
        NgbModule,
        FormsModule,

    ],
    declarations: [
        SubNavComponent,
        LayoutComponent,
        OverviewComponent,
        CandidaturesComponent,
        ListFilterPipe
    ]
})
export class AdminModule { }