import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {  MultistepFormComponent} from "./multistep-form/multistep-form.component";
import { ThankYouPageComponent } from './thank-you-page/thank-you-page.component';
import { HomeComponent } from './home';
import { AuthGuard } from './_helpers';
import { Role } from './_models';
import { ConfirmationComponent } from './confirmation/confirmation.component';

const accountModule = () => import('./account/account.module').then(x => x.AccountModule);
const adminModule = () => import('./admin/admin.module').then(x => x.AdminModule);
const profileModule = () => import('./profile/profile.module').then(x => x.ProfileModule);

const routes: Routes = [
     { path: 'home', component: HomeComponent},
     { path: 'confirmation', component: ConfirmationComponent},
    { path: 'account', loadChildren: accountModule },
    { path: 'profile', loadChildren: profileModule, canActivate: [AuthGuard] },
    { path: 'admin', loadChildren: adminModule, canActivate: [AuthGuard], data: { roles: [Role.Admin] } },
    {path:'form',component:MultistepFormComponent, canActivate:[AuthGuard]},
    {path:'submitted',component:ThankYouPageComponent},
    // otherwise redirect to home
    { path: '**', redirectTo: 'home' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
