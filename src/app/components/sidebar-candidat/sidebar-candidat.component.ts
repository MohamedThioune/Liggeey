import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar-candidat',
  templateUrl: './sidebar-candidat.component.html',
  styleUrls: ['./sidebar-candidat.component.css']
})
export class SidebarCandidatComponent implements OnInit {

  isSidebarVisible = false;
 
  fermerSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;  
    console.log(this.isSidebarVisible);
      
  }
  constructor() { }

  ngOnInit(): void {
  }

}
