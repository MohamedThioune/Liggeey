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
     // console.log(this.openJobs);
      
      this.openJobs.forEach((element:any) => {
        this.appliedNumber=element.applied.length
       // console.log(this.appliedNumber);
        this.tabNumber.push(this.appliedNumber)
        //console.log(this.tabNumber);
        

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
  delete(jobID:number) {
    if (confirm('Voulez vous supprimer ce job')) {
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
      alert("Job deleted successfully.")
      this.router.navigate(['/manage-compagny/'+this.userConnect.id]);
    }
  },
  // Gestion des erreurs
  (error) => {
    ToastNotification.open({
      type: 'delete failed',
      message: error.error.message
    });
  }
);
} else {
ToastNotification.open({
type: 'delete failed',
message: this.message.message
});
    }
  }

}
