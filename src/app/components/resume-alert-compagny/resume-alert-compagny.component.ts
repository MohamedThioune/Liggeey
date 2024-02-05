import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-resume-alert-compagny',
  templateUrl: './resume-alert-compagny.component.html',
  styleUrls: ['./resume-alert-compagny.component.css']
})
export class ResumeAlertCompagnyComponent implements OnInit {
  p: number = 1;  someArrayOfThings!:any
  isSidebarVisible = false;
  showButton = true;
  
  constructor() { }

  ngOnInit(): void {
  }

  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
    this.showButton = false;
  }
  fermerSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
    this.showButton = true;
  }

}
