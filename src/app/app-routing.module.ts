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
import { AboutComponent } from './components/about/about.component';
import { CategorieComponent } from './components/categorie/categorie.component';
import { JobOneComponent } from './components/job-one/job-one.component';
import { JobTwoComponent } from './components/job-two/job-two.component';
import { FooterComponent } from './components/footer/footer.component';
import { CategoryEmploiComponent } from './components/category-emploi/category-emploi.component';
import {SkillsFirstComponent} from "./components/skills-first/skills-first.component";
import {OurAppsComponent} from "./components/our-apps/our-apps.component";

const routes: Routes = [
  { path: 'login', component: LoginComponent },

  { path: 'categorie', component: CategorieComponent },

  { path: 'job', component: JobOneComponent },

  { path: 'joba', component: JobTwoComponent },

  { path: '', component: HomeComponent },

  { path: 'about', component: AboutComponent },

  { path: 'register', component: RegistrationComponent },

  { path: 'courses', component: CoursesComponent },

  { path: 'header', component: HeaderComponent },

  { path: 'footers', component: FootersComponent },

  { path: 'emploi', component: CategoryEmploiComponent },


  { path: 'footer', component: FooterComponent },

  { path: 'reset-password', component: ResetPasswordComponent },

  { path: 'app', component: OurAppsComponent },

  { path: 'skills-first', component: SkillsFirstComponent },
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
