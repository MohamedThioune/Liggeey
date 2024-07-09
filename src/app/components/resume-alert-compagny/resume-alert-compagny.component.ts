import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HomePageService } from 'src/app/services/home-page.service';
import { UsagerService } from 'src/app/services/usager.service';

@Component({
  selector: 'app-resume-alert-compagny',
  templateUrl: './resume-alert-compagny.component.html',
  styleUrls: ['./resume-alert-compagny.component.css']
})
export class ResumeAlertCompagnyComponent implements OnInit {
  p: number = 1;  someArrayOfThings!:any
  isSidebarVisible = false;
  showButton = true;
  loading:boolean=true;
  identifiant:any;
  notifications:any;
  userId!:any
  userConnect:any
  constructor(private homePageService:HomePageService,private route:ActivatedRoute,private usagerService:UsagerService) {  }

  ngOnInit(): void {
    const storedToken = this.usagerService.getToken();
    
    if (storedToken) {   
                // Décodage de la base64
      const decodedToken = atob(storedToken);
 
      // Parse du JSON pour obtenir l'objet original
      this. userConnect = JSON.parse(decodedToken);
    }
    this.homePageService.getNotificationCandidat(  this. userConnect.id).subscribe(data=>{
      //this.notifications = data.filter((notification:any) => notification.userApplyId === this.identifiant);
      this.notifications=data;
      this.loading=false;      
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
