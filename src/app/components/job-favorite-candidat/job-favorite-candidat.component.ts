import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-job-favorite-candidat',
  templateUrl: './job-favorite-candidat.component.html',
  styleUrls: ['./job-favorite-candidat.component.css']
})
export class JobFavoriteCandidatComponent implements OnInit {
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

  constructor() { }

  ngOnInit(): void {
  }

}
