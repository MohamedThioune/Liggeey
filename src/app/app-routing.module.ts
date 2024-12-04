import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { CoursesComponent } from './components/courses/courses.component';
import { HomeComponent } from './components/home/home.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { AboutComponent } from './components/about/about.component';
import { JobOneComponent } from './components/jobs/job-one/job-one.component';
import { JobTwoComponent } from './components/job-two/job-two.component';
import { CategoryEmploiComponent } from './components/category-emploi/category-emploi.component';
import {SkillsFirstComponent} from "./components/skills-first/skills-first.component";
import {OurAppsComponent} from "./components/our-apps/our-apps.component";
import { CategorieComponent } from './components/categories/categorie/categorie.component';
import { DetailJobComponent } from './components/jobs/detail-job/detail-job.component';
import { ListCandidatesComponent } from './components/candidates/list-candidates/list-candidates.component';
import { DetailCandidatComponent } from './components/candidates/detail-candidat/detail-candidat.component';
import { DashboardCandidatComponent } from './components/dashboard-candidat/dashboard-candidat.component';
import { ProfilCandidatComponent } from './components/profil-candidat/profil-candidat.component';
import { ResumeCandidatComponent } from './components/resume-candidat/resume-candidat.component';
import { BlogComponent } from './components/blogs/blog/blog.component';
import { DetailBlogComponent } from './components/blogs/detail-blog/detail-blog.component';
import { AppliesJobsComponent } from './components/applies-jobs/applies-jobs.component';
import { SkillsCandidatComponent } from './components/skills-candidat/skills-candidat.component';
import { CourseCandidatComponent } from './components/course-candidat/course-candidat.component';
import { JobAlertCandidatComponent } from './components/job-alert-candidat/job-alert-candidat.component';
import { JobFavoriteCandidatComponent } from './components/job-favorite-candidat/job-favorite-candidat.component';
import { CvCandidatComponent } from './components/cv-candidat/cv-candidat.component';
import { ChangePasswordCandidatComponent } from './components/change-password-candidat/change-password-candidat.component';
import { DeleteProfilCandidatComponent } from './components/delete-profil-candidat/delete-profil-candidat.component';
import {ContactComponent} from "./components/contact/contact.component";
import { SidebarCandidatComponent } from './components/sidebar-candidat/sidebar-candidat.component';
import { SidebarCompanyComponent } from './components/sidebar-company/sidebar-company.component';
import { CompagnyFavoriteCandidatComponent } from './components/compagny-favorite-candidat/compagny-favorite-candidat.component';
import { AuthGuard } from './guards/auth.guard';
import { HeaderComponent } from './components/header/header.component';
import { FootersComponent } from './components/footers/footers.component';
import { FooterComponent } from './components/footer/footer.component';
import { AppicantsAllCompagnyComponent } from './components/appicants-all-compagny/appicants-all-compagny.component';
import { PassportAllCandidatComponent } from './components/passport-all-candidat/passport-all-candidat.component';
import { PostNewJobCompagnyComponent } from './components/post-new-job-compagny/post-new-job-compagny.component';
import { ManageJobCompagnyComponent } from './components/manage-job-compagny/manage-job-compagny.component';
import { ResumeAlertCompagnyComponent } from './components/resume-alert-compagny/resume-alert-compagny.component';
import { ChangePasswordCompagnyComponent } from './components/change-password-compagny/change-password-compagny.component';
import { DeleteProfilCompagnyComponent } from './components/delete-profil-compagny/delete-profil-compagny.component';
import { ProfilCompagnyComponent } from './components/profil-compagny/profil-compagny.component';
import { ListCompagnyComponent } from './components/compagnies/list-compagny/list-compagny.component';
import { DetailCompagnyComponent } from './components/compagnies/detail-compagny/detail-compagny.component';
import { DashboardEmployerComponent } from './components/dashboard-employer/dashboard-employer.component';
import {EditJobCompanyComponent} from "./components/edit-job-company/edit-job-company.component";
import { CompagnyApplicantComponent } from './components/compagny-applicant/compagny-applicant.component';
import {EditJobsComponent} from "./components/edit-jobs/edit-jobs.component";
import {
  CandidatProfilDashboardComponent
} from "./components/candidat-profil-dashboard/candidat-profil-dashboard.component";
import { CandidateGuard } from './guards/candidate.guard';
import { CompanyGuard } from './guards/company.guard';
import { HireCompanyComponent } from './components/hire-company/hire-company.component';
import { HireCandidatComponent } from './components/hire-candidat/hire-candidat.component';
import { ListChallengesComponent } from './components/challenges/list-challenges/list-challenges.component';
import { DetailChallengeComponent } from './components/challenges/detail-challenge/detail-challenge.component';
import { AddChallengeComponent } from './components/challenges/add-challenge/add-challenge.component';

const routes: Routes = [

  { path: 'header', component: HeaderComponent },

  { path: 'footers', component: FootersComponent },

  { path: 'footer', component: FooterComponent },

  { path: 'all-applicant-compagny', component: CompagnyApplicantComponent ,canActivate: [AuthGuard]},

  { path: 'applicant-compagny/:slug', component: AppicantsAllCompagnyComponent ,canActivate: [AuthGuard]},

  { path: 'passport-candidat', component: PassportAllCandidatComponent ,canActivate: [AuthGuard]},

  { path: 'post-compagny', component: PostNewJobCompagnyComponent ,canActivate: [AuthGuard]},

  { path: 'manage-compagny', component: ManageJobCompagnyComponent ,canActivate: [AuthGuard]},

  { path: 'resume-compagny', component: ResumeAlertCompagnyComponent ,canActivate: [AuthGuard]},

  { path: 'change-compagny/:id', component: ChangePasswordCompagnyComponent ,canActivate: [AuthGuard]},

  { path: 'delete-compagny/:id', component: DeleteProfilCompagnyComponent ,canActivate: [AuthGuard]},

  { path: 'profil-compagny', component: ProfilCompagnyComponent ,canActivate: [CompanyGuard]},

  { path: 'list-compagny', component: ListCompagnyComponent },

  { path: 'detail-compagny/:post_slug', component: DetailCompagnyComponent },

  { path: 'dashboard-employer', component: DashboardEmployerComponent,canActivate: [AuthGuard] },

  { path: 'compagny-candidat', component: CompagnyFavoriteCandidatComponent  ,canActivate: [AuthGuard]},

  { path: 'side', component: SidebarCompanyComponent },

  { path: 'delete-candidat/:id', component: DeleteProfilCandidatComponent ,canActivate: [AuthGuard]},

  { path: 'change-candidat/:id', component: ChangePasswordCandidatComponent ,canActivate: [AuthGuard]},

  { path: 'cv-candidat/:id', component: CvCandidatComponent ,canActivate: [AuthGuard]},

  { path: 'favorite', component: JobFavoriteCandidatComponent },

  { path: 'alert-candidat', component: JobAlertCandidatComponent ,canActivate: [AuthGuard]},

  { path: 'course', component: CourseCandidatComponent },

  { path: 'skills', component: SkillsCandidatComponent },
  
  { path: 'resume-candidat', component: ResumeCandidatComponent ,canActivate: [CandidateGuard]},

  { path: 'profil-candidat', component: ProfilCandidatComponent,canActivate: [AuthGuard] },

  { path: 'detail-job/:slug', component: DetailJobComponent },

  { path: 'detail-category/:slug', component: CategorieComponent },

  { path: 'list-candidat', component: ListCandidatesComponent },

  { path: 'applies-candidat', component: AppliesJobsComponent },

  { path: 'sidebar', component: SidebarCandidatComponent },

  { path: 'detail-candidat', component: DetailCandidatComponent },
  
  { path: 'job', component: JobOneComponent },

  { path: 'joba', component: JobTwoComponent },

  { path: '', component: HomeComponent },

  { path: 'about', component: AboutComponent },

  { path: 'challenges', component: ListChallengesComponent },
  
  { path: 'detail-challenge/:slug', component: DetailChallengeComponent },

  { path: 'add-challenge', component: AddChallengeComponent },
  
  { path: 'login', component: LoginComponent },

  {
    path: 'register',
    component: RegistrationComponent,
    data: { employer: false } 
  },
  {
    path: 'register/employer',
    component: RegistrationComponent,
    data: { employer: true } 
  },

  { path: 'courses', component: CoursesComponent },

  { path: 'emploi', component: CategoryEmploiComponent },

  { path: 'reset-password', component: ResetPasswordComponent },

  { path: 'app', component: OurAppsComponent },

  { path: 'dashboard-candidat', component: DashboardCandidatComponent ,canActivate: [AuthGuard]},

  { path: 'skills-first', component: SkillsFirstComponent },

  { path: 'blog', component: BlogComponent },

  { path: 'detail-article/:slug', component: DetailBlogComponent },

  { path: 'contact', component: ContactComponent },

  { path:'',redirectTo: '/login', pathMatch: 'full'},

  { path: 'edit-job/:slug', component: EditJobCompanyComponent },

  { path: 'edit-job', component: EditJobsComponent },

  { path: 'candidat-profil', component: CandidatProfilDashboardComponent},

  { path:'hire-company',component: HireCompanyComponent},

  { path:'hire-candidat',component: HireCandidatComponent}


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
