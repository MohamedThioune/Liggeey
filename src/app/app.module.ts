import { CUSTOM_ELEMENTS_SCHEMA, NgModule,NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoursesComponent } from './components/courses/courses.component';
import { HomeComponent } from './components/home/home.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { AboutComponent } from './components/about/about.component';
import { JobOneComponent } from './components/jobs/job-one/job-one.component';
import { JobTwoComponent } from './components/job-two/job-two.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { CategoryEmploiComponent } from './components/category-emploi/category-emploi.component';
import { SkillsFirstComponent } from './components/skills-first/skills-first.component';
import { OurAppsComponent } from './components/our-apps/our-apps.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { DetailCategorieComponent } from './components/categories/detail-categorie/detail-categorie.component';
import { CategorieComponent } from './components/categories/categorie/categorie.component';
import { DetailJobComponent } from './components/jobs/detail-job/detail-job.component';
import { JobsComponent } from './components/jobs/jobs.component';
import { BlogComponent } from './components/blogs/blog/blog.component';
import { DetailBlogComponent } from './components/blogs/detail-blog/detail-blog.component';
import { BlogsComponent } from './components/blogs/blogs.component';
import { AppliesJobsComponent } from './components/applies-jobs/applies-jobs.component';
import { ContactComponent } from './components/contact/contact.component';
import { DatePipe } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { NextDirective } from './Directives/next.directive';
import { PrevDirective } from './Directives/prev.directive';
import { FooterComponent } from './components/footer/footer.component';
import { FootersComponent } from './components/footers/footers.component';
import { PublicationComponent } from './components/publication/publication.component';
import { AppicantsAllCompagnyComponent } from './components/appicants-all-compagny/appicants-all-compagny.component';
import { ChangePasswordCompagnyComponent } from './components/change-password-compagny/change-password-compagny.component';
import { DetailCompagnyComponent } from './components/compagnies/detail-compagny/detail-compagny.component';
import { ListCompagnyComponent } from './components/compagnies/list-compagny/list-compagny.component';
import { CompagniesComponent } from './components/compagnies/compagnies.component';
import { CompagnyFavoriteCandidatComponent } from './components/compagny-favorite-candidat/compagny-favorite-candidat.component';
import { DashboardEmployerComponent } from './components/dashboard-employer/dashboard-employer.component';
import { ManageJobCompagnyComponent } from './components/manage-job-compagny/manage-job-compagny.component';
import { PostNewJobCompagnyComponent } from './components/post-new-job-compagny/post-new-job-compagny.component';
import { ProfilCompagnyComponent } from './components/profil-compagny/profil-compagny.component';
import { ResumeAlertCompagnyComponent } from './components/resume-alert-compagny/resume-alert-compagny.component';
import { SidebarCompanyComponent } from './components/sidebar-company/sidebar-company.component';
import { DeleteProfilCompagnyComponent } from './components/delete-profil-compagny/delete-profil-compagny.component';
import { CandidatesComponent } from './components/candidates/candidates.component';
import { DetailCandidatComponent } from './components/candidates/detail-candidat/detail-candidat.component';
import { ListCandidatesComponent } from './components/candidates/list-candidates/list-candidates.component';
import { ChangePasswordCandidatComponent } from './components/change-password-candidat/change-password-candidat.component';
import { CourseCandidatComponent } from './components/course-candidat/course-candidat.component';
import { CvCandidatComponent } from './components/cv-candidat/cv-candidat.component';
import { DashboardCandidatComponent } from './components/dashboard-candidat/dashboard-candidat.component';
import { DeleteProfilCandidatComponent } from './components/delete-profil-candidat/delete-profil-candidat.component';
import { JobAlertCandidatComponent } from './components/job-alert-candidat/job-alert-candidat.component';
import { SkillsCandidatComponent } from './components/skills-candidat/skills-candidat.component';
import { JobFavoriteCandidatComponent } from './components/job-favorite-candidat/job-favorite-candidat.component';
import { PassportAllCandidatComponent } from './components/passport-all-candidat/passport-all-candidat.component';
import { SidebarCandidatComponent } from './components/sidebar-candidat/sidebar-candidat.component';
import { ProfilCandidatComponent } from './components/profil-candidat/profil-candidat.component';
import { ResumeCandidatComponent } from './components/resume-candidat/resume-candidat.component';
import { RouterModule } from '@angular/router';
import { CompagnyApplicantComponent } from './components/compagny-applicant/compagny-applicant.component';
import { EditJobsComponent } from './components/edit-jobs/edit-jobs.component';
import { CandidatProfilDashboardComponent } from './components/candidat-profil-dashboard/candidat-profil-dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    CoursesComponent,
    HomeComponent,
    ResetPasswordComponent,
    AboutComponent,
    CategorieComponent,
    JobOneComponent,
    JobTwoComponent,
    CategoryEmploiComponent,
    SkillsFirstComponent,
    OurAppsComponent,
    CategoriesComponent,
    DetailCategorieComponent,
    DetailJobComponent,
    JobsComponent,
    BlogComponent,
    DetailBlogComponent,
    BlogsComponent,
    AppliesJobsComponent,
    ContactComponent,
    HeaderComponent,
    NextDirective,
    PrevDirective,
    FooterComponent,
    FootersComponent,
    PublicationComponent,
    AppicantsAllCompagnyComponent,
    ChangePasswordCompagnyComponent,
    DetailCompagnyComponent,
    ListCompagnyComponent,
    CompagniesComponent,
    CompagnyFavoriteCandidatComponent,
    DashboardEmployerComponent,
    ManageJobCompagnyComponent,
    PostNewJobCompagnyComponent,
    ProfilCompagnyComponent,
    ResumeAlertCompagnyComponent,
    SidebarCompanyComponent,
    DeleteProfilCompagnyComponent,
    CandidatesComponent,
    DetailCandidatComponent,
    ListCandidatesComponent,
    ChangePasswordCandidatComponent,
    CourseCandidatComponent,
    CvCandidatComponent,
    DashboardCandidatComponent,
    DeleteProfilCandidatComponent,
    JobAlertCandidatComponent,
    SkillsCandidatComponent,
    JobFavoriteCandidatComponent,
    SidebarCandidatComponent,
    PassportAllCandidatComponent,
    ProfilCandidatComponent,
    ResumeCandidatComponent,
    CompagnyApplicantComponent,
    EditJobsComponent,
    CandidatProfilDashboardComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    RouterModule
  ],
  schemas: [
    NO_ERRORS_SCHEMA, // Ignorer les erreurs de schéma dans ce module
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
