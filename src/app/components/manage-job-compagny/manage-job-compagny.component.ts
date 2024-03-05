import { Component, OnInit } from '@angular/core';
import { HomePageService } from 'src/app/services/home-page.service';
import { UsagerService } from 'src/app/services/usager.service';

@Component({
  selector: 'app-manage-job-compagny',
  templateUrl: './manage-job-compagny.component.html',
  styleUrls: ['./manage-job-compagny.component.css']
})
export class ManageJobCompagnyComponent implements OnInit {
  p: number = 1;  someArrayOfThings!:any
  isSidebarVisible = false;
  showButton = true;
  userConnect:any;
  openJobs:any;
  appliedNumber!:number

  constructor(private homeService:HomePageService,private usagerService: UsagerService) { }

  ngOnInit(): void {
      // Récupération du token depuis le local storage
      const storedToken = this.usagerService.getToken();
    
      if (storedToken) {   
                  // Décodage de la base64
        const decodedToken = atob(storedToken);
  
        // Parse du JSON pour obtenir l'objet original
        this. userConnect = JSON.parse(decodedToken);
      }
      
    this.homeService.manageJob(this.userConnect.id).subscribe((data:any)=>{
      this.openJobs=data;
      
      this.openJobs.forEach((element:any) => {
        this.appliedNumber=element.applied.length
        console.log(this.appliedNumber);

      });
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
