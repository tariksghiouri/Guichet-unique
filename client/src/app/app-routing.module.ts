import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { AuthGuard } from './auth/auth.guard';
import {  MultistepFormComponent} from "./multistep-form/multistep-form.component";
import { ThankYouPageComponent } from './thank-you-page/thank-you-page.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./nonAuthModules/authentication.module').then(
        (m) => m.AuthenticationModule
      ),
  },
  
  // {
  //   path: 'form',
  //   component:MultistepFormComponent,
  //   canActivate: [AuthGuard],
  // },

  
  
  {path:'home',component:HomepageComponent},
  {path:'form',component:MultistepFormComponent},
  {path:'submitted',component:ThankYouPageComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
