import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { JwtInterceptor, ErrorInterceptor, appInitializer } from './_helpers';
import { AccountService } from './_services';
import { AppComponent } from './app.component';
import { AlertComponent } from './_components';
import { HomeComponent } from './home';
import { MultistepFormComponent } from './multistep-form/multistep-form.component';
import { ThankYouPageComponent } from './thank-you-page/thank-you-page.component';
import { NavigationComponent } from './navigation/navigation.component';
import { AccordionModule } from 'ngx-bootstrap/accordion';;
import { ConfirmationComponent } from './confirmation/confirmation.component'
    ;
import { EditFormComponent } from './edit-form/edit-form.component'
import { DatePipe } from '@angular/common';;
import { CriteresComponent } from './criteres/criteres.component'
    ;
import { ProcedureComponent } from './procedure/procedure.component'
import { FormsModule } from '@angular/forms';;
import { AllCandidaturesComponent } from './all-candidatures/all-candidatures.component'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';;
import { ResultatComponent } from './resultat/resultat.component'


@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        FormsModule,
        FontAwesomeModule,
        HttpClientModule,
        AppRoutingModule,
        AccordionModule.forRoot(),
        


    ],
    declarations: [
        MultistepFormComponent,
        NavigationComponent,
        ThankYouPageComponent,
        AppComponent,
        AlertComponent,
        HomeComponent        ,
        ConfirmationComponent,
        EditFormComponent,
        CriteresComponent,
        ProcedureComponent,
        AllCandidaturesComponent,
        ResultatComponent,],
    providers: [
        DatePipe,
        { provide: APP_INITIALIZER, useFactory: appInitializer, multi: true, deps: [AccountService] },
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

        // provider used to create fake backend
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }