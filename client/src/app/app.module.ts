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
import { AccordionModule } from 'ngx-bootstrap/accordion';



@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
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
        HomeComponent
    ],
    providers: [
        { provide: APP_INITIALIZER, useFactory: appInitializer, multi: true, deps: [AccountService] },
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

        // provider used to create fake backend
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }