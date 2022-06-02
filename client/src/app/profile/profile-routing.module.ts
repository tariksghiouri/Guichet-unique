import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from './layout.component';
import { DetailsComponent } from './details.component';
import { UpdateComponent } from './update.component';
import { EditFormComponent } from '@app/edit-form/edit-form.component';
import { PersonalInfoEditComponent } from './personal-info-edit/personal-info-edit.component';

const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [

            { path: '', component: PersonalInfoEditComponent },
            { path: 'mesCandidatures', component: DetailsComponent },
            // { path: 'update', component: UpdateComponent }
            { path: 'edit', component:EditFormComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProfileRoutingModule { }