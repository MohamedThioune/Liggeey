import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-passport-all-candidat',
  templateUrl: './passport-all-candidat.component.html',
  styleUrls: ['./passport-all-candidat.component.css']
})
export class PassportAllCandidatComponent implements OnInit {
  p: number = 1;  someArrayOfThings!:any
  isSidebarVisible = false;
  showButton = true;
  isCollapsedJobs = true;
  isCollapsedEmployers = false;
  isCollapsedAbout = false;
  isCollapsedMobile = false;
  ongletSelectionne: any ;

  constructor() { }

  ngOnInit(): void {
    this.ongletSelectionne = "All";
  }

  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
    this.showButton = false;
  }
  fermerSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
    this.showButton = true;
  }

  toggleCollapseJobs() {
    this.isCollapsedJobs = !this.isCollapsedJobs;
  }
  toggleCollapseEmployers() {
    this.isCollapsedEmployers = !this.isCollapsedEmployers;
  }
  toggleCollapseAbout() {
    this.isCollapsedAbout = !this.isCollapsedAbout;
  }
  toggleCollapseMobile() {
    this.isCollapsedMobile = !this.isCollapsedMobile;
  }

  selectionnerOnglet(onglet: string): void {
    this.ongletSelectionne = onglet;
    console.log( this.ongletSelectionne);
    
  }

}
