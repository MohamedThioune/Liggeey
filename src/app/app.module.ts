import { CUSTOM_ELEMENTS_SCHEMA, NgModule,NO_ERRORS_SCHEMA } from '@angular/core';
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
import { ProfilCandidatComponent } from './components/candidates/profil-candidat/profil-candidat.component';
import { ResumeCandidatComponent } from './components/candidates/resume-candidat/resume-candidat.component';
import { BlogComponent } from './components/blogs/blog/blog.component';
import { DetailBlogComponent } from './components/blogs/detail-blog/detail-blog.component';
import { BlogsComponent } from './components/blogs/blogs.component';
import { AppliesJobsComponent } from './components/candidates/applies-jobs/applies-jobs.component';
import { TopicCandidatComponent } from './components/candidates/topic-candidat/topic-candidat.component';
import { BadgeCandidatComponent } from './components/badge-candidat/badge-candidat.component';
import { CertificatCandidatComponent } from './components/certificat-candidat/certificat-candidat.component';
import { SkillsCandidatComponent } from './components/skills-candidat/skills-candidat.component';
import { AssessmentCandidatComponent } from './components/assessment-candidat/assessment-candidat.component';
import { CourseCandidatComponent } from './components/course-candidat/course-candidat.component';
import { ReviewCandidatComponent } from './components/review-candidat/review-candidat.component';
import { JobAlertCandidatComponent } from './components/job-alert-candidat/job-alert-candidat.component';
import { JobFavoriteCandidatComponent } from './components/job-favorite-candidat/job-favorite-candidat.component';
import { CvCandidatComponent } from './components/cv-candidat/cv-candidat.component';
import { ChangePasswordCandidatComponent } from './components/change-password-candidat/change-password-candidat.component';
import { DeleteProfilCandidatComponent } from './components/delete-profil-candidat/delete-profil-candidat.component';
import { ListCompagnyComponent } from './components/compagnies/list-compagny/list-compagny.component';
import { CompagniesComponent } from './components/compagnies/compagnies.component';
import { DetailCompagnyComponent } from './components/compagnies/detail-compagny/detail-compagny.component';
import { ProfilCompagnyComponent } from './components/profil-compagny/profil-compagny.component';
import { DeleteProfilCompagnyComponent } from './components/delete-profil-compagny/delete-profil-compagny.component';
import { ChangePasswordCompagnyComponent } from './components/change-password-compagny/change-password-compagny.component';
import { ResumeAlertCompagnyComponent } from './components/resume-alert-compagny/resume-alert-compagny.component';
import { ManageJobCompagnyComponent } from './components/manage-job-compagny/manage-job-compagny.component';
import { PostNewJobCompagnyComponent } from './components/post-new-job-compagny/post-new-job-compagny.component';
import { ContactComponent } from './components/contact/contact.component';
import { PassportAllCandidatComponent } from './components/passport-all-candidat/passport-all-candidat.component';
import { AppicantsAllCompagnyComponent } from './components/appicants-all-compagny/appicants-all-compagny.component';
import { SidebarCandidatComponent } from './components/sidebar-candidat/sidebar-candidat.component';
import { SidebarCompanyComponent } from './components/sidebar-company/sidebar-company.component';

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
    ProfilCandidatComponent,
    ResumeCandidatComponent,
    BlogComponent,
    DetailBlogComponent,
    BlogsComponent,
    AppliesJobsComponent,
    TopicCandidatComponent,
    BadgeCandidatComponent,
    CertificatCandidatComponent,
    SkillsCandidatComponent,
    AssessmentCandidatComponent,
    CourseCandidatComponent,
    ReviewCandidatComponent,
    JobAlertCandidatComponent,
    JobFavoriteCandidatComponent,
    CvCandidatComponent,
    ChangePasswordCandidatComponent,
    DeleteProfilCandidatComponent,
    ListCompagnyComponent,
    CompagniesComponent,
    DetailCompagnyComponent,
    ProfilCompagnyComponent,
    DeleteProfilCompagnyComponent,
    ChangePasswordCompagnyComponent,
    ResumeAlertCompagnyComponent,
    ManageJobCompagnyComponent,
    PostNewJobCompagnyComponent,
    ContactComponent,
    PassportAllCandidatComponent,
    AppicantsAllCompagnyComponent,
    SidebarCandidatComponent,
    SidebarCompanyComponent,
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
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
