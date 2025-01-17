import { Component, OnInit } from '@angular/core';
import { HomePageService } from 'src/app/services/home-page.service';
import { UsagerService } from 'src/app//services/usager.service';
import { Router } from '@angular/router';
import { ToastNotification } from 'src/app/notification/ToastNotification';

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
  loading:boolean=true;
  appliedNumber!:number;
  tabNumber:any[]=[];
  message: any = {
    type: '',
    message: ''
  };
  constructor(private homeService:HomePageService,private usagerService: UsagerService,private router:Router) { }

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
      this.loading=false
      
      this.openJobs.forEach((element:any) => {        
        this.appliedNumber=element.applied.length
        this.tabNumber.push(this.appliedNumber)
        const date = new Date(element.posted_at);
        element.date = this.formatDate(date);
        if (element.expired_at) {
          const expirationDate = new Date(element.expired_at);
          if (!isNaN(expirationDate.getTime())) {
            element.expiration = this.formatDate(expirationDate);
          } else {
            element.expiration = ''; 
          }
        } else {
          element.expiration = ''; 
      }

      });
    })
  }
  formatDate(date: Date): string {
    // Tableau des noms de mois
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
    // Récupérer le mois, le jour et l'année de la date
    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    const string =","

    // Formater la date dans le format souhaité
    return `${month} ${day}${string}${year}`;
  }

  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
    this.showButton = false;
  }
  fermerSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
    this.showButton = true;
  }
  delete(jobID:number) {
    if (confirm('Do you want to delete this job?')) {
   this.homeService.deleteJob(jobID,this.userConnect.id).subscribe(
  // Succès de la requête
  (response) => {

    let typeR = "error"
    if (<any>response ) {
      typeR = "success";
      this.message= "Job deleted successfully."
    }
    ToastNotification.open({
      type: typeR,
      message: this.message
    });
    if (typeR == "success") {
      this.router.navigate(['/manage-compagny/']);
    }
  },
  // Gestion des erreurs
  (error) => {
   // console.log(error);
    
    ToastNotification.open({
      type: 'deletion failed',
      message: error.error.message
    });
  }
);
} else {
      ToastNotification.open({
      type: 'error',
      message: 'deletion canceled'
      });
    }
  }


 
}
