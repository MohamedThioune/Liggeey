import { NgModule } from '@angular/core';
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
import { CategorieComponent } from './components/categorie/categorie.component';
import { JobOneComponent } from './components/job-one/job-one.component';
import { JobTwoComponent } from './components/job-two/job-two.component';
import { PublicationComponent } from './components/publication/publication.component';
import { NextDirective } from './next.directive';
import { PrevDirective } from './prev.directive';
import { NgxPaginationModule } from 'ngx-pagination';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CategoryEmploiComponent } from './components/category-emploi/category-emploi.component';

import { SkillsFirstComponent } from './components/skills-first/skills-first.component';
import { OurAppsComponent } from './components/our-apps/our-apps.component';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
