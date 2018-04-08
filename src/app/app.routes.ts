import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth.service';
import { SignupComponent } from './signup/signup.component';
import { EmailComponent } from './email/email.component';
import { ProjectComponent } from './project/project.component';
import { ContributionsComponent } from './contributions/contributions.component';
import { MakerSpaceReservationComponent } from './maker-space-reservation/maker-space-reservation.component';
import { ItemsComponent } from './items/items.component';
import { GalleryComponent } from './gallery/gallery.component';
import { TestingComponent } from './testing/testing.component';


export const router: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login-email', component: EmailComponent },
  { path: 'project', component: ProjectComponent },
  { path: 'contributions', component: ContributionsComponent },
  { path: 'reservation', component: MakerSpaceReservationComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'items', component: ItemsComponent },
  { path: 'gallery1', component:  GalleryComponent},
  { path: 'testing', component: TestingComponent }

]

export const routes: ModuleWithProviders = RouterModule.forRoot(router);
