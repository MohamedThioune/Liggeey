import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-job-alert-candidat',
  templateUrl: './job-alert-candidat.component.html',
  styleUrls: ['./job-alert-candidat.component.css']
})
export class JobAlertCandidatComponent implements OnInit {
  p: number = 1;  someArrayOfThings!:any
  isSidebarVisible = false;
  showButton = true;

  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
    this.showButton = false;
  }
  fermerSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
    this.showButton = true;
  }
  collection: any[] = this.someArrayOfThings=[
    {
      "color":"#4947D0",
      "profil":"Catalyst",
      "location":"Dakar",
      "timezone":"11",
      "logo": "../../../assets/img/Rectangle 111.png",
      "domaine":"Figma"
    },
    {
      "profil":"Figma",
      "location":"Nederland, NL",
      "timezone":"11",
      "logo": "../../../assets/img/Rectangle 112.png",
      "domaine":"Php"
    }
    ,{
      "profil":"Catalyst",
      "location":"Dakar",
      "timezone":"11",
      "logo": "../../../assets/img/Rectangle 111.png",
      "domaine":"Figma"
    },
    {
      "profil":"Figma",
      "location":"Nederland, NL",
      "timezone":"11",
      "logo": "../../../assets/img/Rectangle 112.png",
      "domaine":"Php"
    },
    {
      "profil":"Catalyst",
      "location":"Dakar",
      "timezone":"11",
      "logo": "../../../assets/img/Rectangle 111.png",
      "domaine":"Figma"
    },
    {
      "profil":"Figma",
      "location":"Nederland, NL",
      "timezone":"11",
      "logo": "../../../assets/img/Rectangle 112.png",
      "domaine":"php"
    },
    {
      "color":"#4947D0",
      "profil":"Catalyst",
      "location":"Dakar",
      "timezone":"11",
      "logo": "../../../assets/img/Rectangle 111.png",
      "domaine":"Figma"
    },
    {
      "profil":"Figma",
      "location":"Nederland, NL",
      "timezone":"11",
      "logo": "../../../assets/img/Rectangle 112.png",
      "domaine":"Php"
    }
    ,{
      "profil":"Catalyst",
      "location":"Dakar",
      "timezone":"11",
      "logo": "../../../assets/img/Rectangle 111.png",
      "domaine":"Figma"
    },
    {
      "profil":"Figma",
      "location":"Nederland, NL",
      "timezone":"11",
      "logo": "../../../assets/img/Rectangle 112.png",
      "domaine":"Php"
    },
    {
      "profil":"Catalyst",
      "location":"Dakar",
      "timezone":"11",
      "logo": "../../../assets/img/Rectangle 111.png",
      "domaine":"Figma"
    },
    {
      "profil":"Figma",
      "location":"Nederland, NL",
      "timezone":"11",
      "logo": "../../../assets/img/Rectangle 112.png",
      "domaine":"Php"
    }
  ]; 
  constructor() { }

  ngOnInit(): void {
  }

}
