import { environment } from './../environments/environment'
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, FormBuilder, Validators, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CalendarComponent } from "ap-angular2-fullcalendar/src/calendar/calendar";
//import { NgSrcModule } from 'ng-src';
import { SweetAlertService } from 'ng2-sweetalert2';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { EmailComponent } from './email/email.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth.service';
import { DataService } from './data.service';
import { routes } from './app.routes';
import { AppNavbarComponent } from './app-navbar/app-navbar.component';
import { ProjectComponent } from './project/project.component';
import { ContributionsComponent } from './contributions/contributions.component';
import { MakerSpaceReservationComponent } from './maker-space-reservation/maker-space-reservation.component';
import { GalleryComponent } from  './gallery/gallery.component';
import { TestingComponent } from './testing/testing.component';

//Items
import { ItemsComponent } from './items/items.component';
import { ItemService } from './item.service';
import { AddItemComponent } from './add-item/add-item.component';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { GalleryAddComponent } from './gallery-add/gallery-add.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EmailComponent,
    SignupComponent,
    DashboardComponent,
    AppNavbarComponent,
    ProjectComponent,
    ContributionsComponent,
    MakerSpaceReservationComponent,
    ItemsComponent,
    AddItemComponent,
    GalleryComponent,
    TestingComponent,
    GalleryAddComponent
  ],
  

  imports: [
    BrowserModule,
   // NgSrcModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    AngularFirestoreModule,
    NgbModule.forRoot(),
    routes
  ],

  providers: [
    AuthGuard,
    DataService,
    SweetAlertService,
    ItemService],
  bootstrap: [AppComponent]
})
export class AppModule { }
