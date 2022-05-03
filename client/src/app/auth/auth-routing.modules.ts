import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MultistepFormComponent } from '../multistep-form/multistep-form.component';

const routes: Routes = [
 
  {
    path: 'form',
    component: MultistepFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
