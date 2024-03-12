import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CandidatesComponent } from '../components/candidates/candidates.component';
import { DetailCandidatComponent } from '../components/candidates/detail-candidat/detail-candidat.component';
import { ListCandidatesComponent } from '../components/candidates/list-candidates/list-candidates.component';
import { ChangePasswordCandidatComponent } from '../components/change-password-candidat/change-password-candidat.component';
import { CourseCandidatComponent } from '../components/course-candidat/course-candidat.component';
import { CvCandidatComponent } from '../components/cv-candidat/cv-candidat.component';
import { DashboardCandidatComponent } from '../components/dashboard-candidat/dashboard-candidat.component';
import { DeleteProfilCandidatComponent } from '../components/delete-profil-candidat/delete-profil-candidat.component';
import { JobAlertCandidatComponent } from '../components/job-alert-candidat/job-alert-candidat.component';
import { SkillsCandidatComponent } from '../components/skills-candidat/skills-candidat.component';
import { JobFavoriteCandidatComponent } from '../components/job-favorite-candidat/job-favorite-candidat.component';
import { PassportAllCandidatComponent } from '../components/passport-all-candidat/passport-all-candidat.component';
import { ResumeCandidatComponent } from '../components/resume-candidat/resume-candidat.component';
import { ProfilCandidatComponent } from '../components/profil-candidat/profil-candidat.component';
import { SidebarCandidatComponent } from '../components/sidebar-candidat/sidebar-candidat.component';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { CandidateRoutingModule } from './candidate-routing.module';



@NgModule({
  declarations: [
  

  ],
  imports: [
    CommonModule,
    RouterModule,
    NgxPaginationModule,
    FormsModule,
    CandidateRoutingModule,
  ],
  exports:[
   

  ],
  schemas: [
    NO_ERRORS_SCHEMA, // Ignorer les erreurs de schéma dans ce module
    CUSTOM_ELEMENTS_SCHEMA
  ],

})
export class CandidateModule { }
