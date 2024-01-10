import { NgModule,NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoursesComponent } from './components/courses/courses.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { FootersComponent } from './components/footers/footers.component';
import { HomeComponent } from './components/home/home.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { AboutComponent } from './components/about/about.component';
import { JobOneComponent } from './components/jobs/job-one/job-one.component';
import { JobTwoComponent } from './components/job-two/job-two.component';
import { PublicationComponent } from './components/publication/publication.component';
import { NextDirective } from './next.directive';
import { PrevDirective } from './prev.directive';
import { NgxPaginationModule } from 'ngx-pagination';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CategoryEmploiComponent } from './components/category-emploi/category-emploi.component';
import { SkillsFirstComponent } from './components/skills-first/skills-first.component';
import { OurAppsComponent } from './components/our-apps/our-apps.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { DetailCategorieComponent } from './components/categories/detail-categorie/detail-categorie.component';
import { CategorieComponent } from './components/categories/categorie/categorie.component';
import { DetailJobComponent } from './components/jobs/detail-job/detail-job.component';
import { JobsComponent } from './components/jobs/jobs.component';
import { CandidatesComponent } from './components/candidates/candidates.component';
import { ListCandidatesComponent } from './components/candidates/list-candidates/list-candidates.component';
import { DetailCandidatComponent } from './components/candidates/detail-candidat/detail-candidat.component';
import { DashboardCandidatComponent } from './components/candidates/dashboard-candidat/dashboard-candidat.component';
import { DashboardEmployerComponent } from './components/dashboard-employer/dashboard-employer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ProfilCandidatComponent } from './components/candidates/profil-candidat/profil-candidat.component';
import { ResumeCandidatComponent } from './components/candidates/resume-candidat/resume-candidat.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    CoursesComponent,
    FooterComponent,
    HeaderComponent,
    FootersComponent,
    HomeComponent,
    ResetPasswordComponent,
    AboutComponent,
    CategorieComponent,
    JobOneComponent,
    JobTwoComponent,
    PublicationComponent,
    NextDirective,
    PrevDirective,
    CategoryEmploiComponent,
    SkillsFirstComponent,
    OurAppsComponent,
    CategoriesComponent,
    DetailCategorieComponent,
    DetailJobComponent,
    JobsComponent,
    CandidatesComponent,
    ListCandidatesComponent,
    DetailCandidatComponent,
    DashboardCandidatComponent,
    DashboardEmployerComponent,
    SidebarComponent,
    ProfilCandidatComponent,
    ResumeCandidatComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
  ],
  schemas: [
    NO_ERRORS_SCHEMA, // Ignorer les erreurs de schéma dans ce module
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
