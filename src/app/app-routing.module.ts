import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { CoursesComponent } from './components/courses/courses.component';
import { HeaderComponent } from './components/header/header.component';
import { FootersComponent } from './components/footers/footers.component';
import { HomeComponent } from './components/home/home.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },

  { path: '', component: HomeComponent },

  { path: 'register', component: RegistrationComponent },

  { path: 'courses', component: CoursesComponent },

  { path: 'header', component: HeaderComponent },

  { path: 'footers', component: FootersComponent },
  
  { path: 'reset-password', component: ResetPasswordComponent },
  
  
  { path:'',redirectTo: '/login', pathMatch: 'full'}
];



@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
