import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar-candidat',
  templateUrl: './sidebar-candidat.component.html',
  styleUrls: ['./sidebar-candidat.component.css']
})
export class SidebarCandidatComponent implements OnInit {

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
