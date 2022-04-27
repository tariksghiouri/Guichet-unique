import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { FormComponent } from   './form/form.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

const routes: Routes = [
  {path:'form',component:FormComponent},
  {path:'home',component:HomepageComponent},
  // { path: '404', pathMatch: 'full', 
  //       component:PagenotfoundComponent  },
         { path: '**', component:HomepageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
