import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HomePageService } from 'src/app/services/home-page.service';

@Component({
  selector: 'app-resume-alert-compagny',
  templateUrl: './resume-alert-compagny.component.html',
  styleUrls: ['./resume-alert-compagny.component.css']
})
export class ResumeAlertCompagnyComponent implements OnInit {
  p: number = 1;  someArrayOfThings!:any
  isSidebarVisible = false;
  showButton = true;
  identifiant:any;
  notifications:any;
  
  constructor(private homePageService:HomePageService,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.identifiant = +this.route.snapshot.params['id'];    
    this.homePageService.getNotificationCandidat( this.identifiant).subscribe(data=>{
      //this.notifications = data.filter((notification:any) => notification.userApplyId === this.identifiant);
      this.notifications=data;
      console.log(this.notifications);
      
    })
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
