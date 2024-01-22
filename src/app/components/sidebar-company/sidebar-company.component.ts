import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar-company',
  templateUrl: './sidebar-company.component.html',
  styleUrls: ['./sidebar-company.component.css']
})
export class SidebarCompanyComponent implements OnInit {
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
