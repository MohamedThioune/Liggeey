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
import { BlogComponent } from './components/blog/blog.component';
import { DetailBlogComponent } from './components/detail-blog/detail-blog.component';

const routes: Routes = [
  
  { path: 'resume', component: ResumeCandidatComponent },

  { path: 'profil', component: ProfilCandidatComponent },

  { path: 'chart', component: ChartDashbordComponent },
  
  { path: 'detail', component: DetailJobComponent },

  { path: 'list-candidat', component: ListCandidatesComponent },

  { path: 'sidebar', component: SidebarComponent },
  

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

  { path: 'detail-article', component: DetailBlogComponent },

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
