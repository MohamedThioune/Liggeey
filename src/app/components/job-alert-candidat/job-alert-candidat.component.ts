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
