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
import { JobOneComponent } from './components/jobs/job-one/job-one.component';
import { JobTwoComponent } from './components/job-two/job-two.component';
import { FooterComponent } from './components/footer/footer.component';
import { CategoryEmploiComponent } from './components/category-emploi/category-emploi.component';
import {SkillsFirstComponent} from "./components/skills-first/skills-first.component";
import {OurAppsComponent} from "./components/our-apps/our-apps.component";
import { CategorieComponent } from './components/categories/categorie/categorie.component';
import { DetailJobComponent } from './components/jobs/detail-job/detail-job.component';
import { ListCandidatesComponent } from './components/candidates/list-candidates/list-candidates.component';
import { DetailCandidatComponent } from './components/candidates/detail-candidat/detail-candidat.component';
import { DashboardCandidatComponent } from './components/candidates/dashboard-candidat/dashboard-candidat.component';
import { DashboardEmployerComponent } from './components/dashboard-employer/dashboard-employer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ChartDashbordComponent } from './components/chart-dashbord/chart-dashbord.component';
import { ProfilCandidatComponent } from './components/candidates/profil-candidat/profil-candidat.component';
import { ResumeCandidatComponent } from './components/candidates/resume-candidat/resume-candidat.component';
import { BlogComponent } from './components/blogs/blog/blog.component';
import { DetailBlogComponent } from './components/blogs/detail-blog/detail-blog.component';
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
import { DetailCompagnyComponent } from './components/compagnies/detail-compagny/detail-compagny.component';
import { ProfilCompagnyComponent } from './components/profil-compagny/profil-compagny.component';
import { DeleteProfilCompagnyComponent } from './components/delete-profil-compagny/delete-profil-compagny.component';
import { ChangePasswordCompagnyComponent } from './components/change-password-compagny/change-password-compagny.component';
import { ResumeAlertCompagnyComponent } from './components/resume-alert-compagny/resume-alert-compagny.component';
import { ManageJobCompagnyComponent } from './components/manage-job-compagny/manage-job-compagny.component';
import { PostNewJobCompagnyComponent } from './components/post-new-job-compagny/post-new-job-compagny.component';

const routes: Routes = [
  
  
  
  { path: 'post-compagny', component: PostNewJobCompagnyComponent },

  { path: 'manage-compagny', component: ManageJobCompagnyComponent },

  { path: 'resume-compagny', component: ResumeAlertCompagnyComponent },

  { path: 'change-compagny', component: ChangePasswordCompagnyComponent },

  { path: 'delete-compagny', component: DeleteProfilCompagnyComponent },

  { path: 'profil-compagny', component: ProfilCompagnyComponent },

  { path: 'list-compagny', component: ListCompagnyComponent },

  { path: 'delete', component: DeleteProfilCandidatComponent }, 

  { path: 'change', component: ChangePasswordCandidatComponent }, 

  { path: 'cv', component: CvCandidatComponent }, 

  { path: 'favorite', component: JobFavoriteCandidatComponent }, 

  { path: 'alert', component: JobAlertCandidatComponent }, 

  { path: 'review', component: ReviewCandidatComponent }, 

  { path: 'course', component: CourseCandidatComponent }, 

  { path: 'assessment', component: AssessmentCandidatComponent }, 

  { path: 'skills', component: SkillsCandidatComponent }, 

  { path: 'certificat', component: CertificatCandidatComponent }, 

  { path: 'badge', component: BadgeCandidatComponent },

  { path: 'topic', component: TopicCandidatComponent },

  { path: 'resume', component: ResumeCandidatComponent },

  { path: 'profil', component: ProfilCandidatComponent },

  { path: 'chart', component: ChartDashbordComponent },
  
  { path: 'detail', component: DetailJobComponent },

  { path: 'list-candidat', component: ListCandidatesComponent },

  { path: 'applies', component: AppliesJobsComponent },

  { path: 'sidebar', component: SidebarComponent },
  
  { path: 'detail-compagny', component: DetailCompagnyComponent },

  { path: 'detail-candidat/:id', component: DetailCandidatComponent },
  
  { path: 'job', component: JobOneComponent },

  { path: 'dashboard-employer', component: DashboardEmployerComponent },

  { path: 'categorie', component: CategorieComponent },

  { path: 'joba', component: JobTwoComponent },

  { path: '', component: HomeComponent },

  { path: 'about', component: AboutComponent },

  { path: 'login', component: LoginComponent },


  { path: 'register', component: RegistrationComponent },

  { path: 'courses', component: CoursesComponent },

  { path: 'header', component: HeaderComponent },

  { path: 'footers', component: FootersComponent },

  { path: 'emploi', component: CategoryEmploiComponent },

  { path: 'footer', component: FooterComponent },

  { path: 'reset-password', component: ResetPasswordComponent },

  { path: 'app', component: OurAppsComponent },

  { path: 'dashboard-candidat', component: DashboardCandidatComponent },

  { path: 'skills-first', component: SkillsFirstComponent },

  { path: 'blog', component: BlogComponent },

  { path: 'detail-article:id', component: DetailBlogComponent },

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
