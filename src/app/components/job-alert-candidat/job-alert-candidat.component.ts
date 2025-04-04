import { Component, OnInit } from '@angular/core';
import { HomePageService } from 'src/app/services/home-page.service';
import { FormBuilder } from '@angular/forms';
import { UsagerService } from 'src/app/services/usager.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-job-alert-candidat',
  templateUrl: './job-alert-candidat.component.html',
  styleUrls: ['./job-alert-candidat.component.css']
})
export class JobAlertCandidatComponent implements OnInit {
  p: number = 1;  someArrayOfThings!:any
  isSidebarVisible = false;
  showButton = true;
  identifiant:number | null = 0;
  loading:boolean=true;
  notifications:any;
  userConnect:any

  constructor(private route : ActivatedRoute ,private HomePageService: HomePageService,private fb: FormBuilder,private router: Router , private homeService:HomePageService,private usagerService: UsagerService) { }

  ngOnInit(): void {
    this.identifiant = +this.route.snapshot.params['id'];  
    const storedToken = this.usagerService.getToken();

    if (storedToken) {
                // Décodage de la base64
      const decodedToken = atob(storedToken);

      // Parse du JSON pour obtenir l'objet original
      this. userConnect = JSON.parse(decodedToken);
 
   // this.updateCachedData();
    }      
    this.HomePageService.getNotificationCandidat( this.userConnect.id).subscribe(data=>{
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
