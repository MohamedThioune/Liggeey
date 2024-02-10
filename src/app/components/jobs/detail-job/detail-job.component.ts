import { Component, OnInit ,ChangeDetectorRef} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HomePageService } from 'src/app/services/home-page.service';
import { UsagerService } from 'src/app/services/usager.service';
import { ToastNotification } from 'src/app/notification/ToastNotification';

@Component({
  selector: 'app-detail-job',
  templateUrl: './detail-job.component.html',
  styleUrls: ['./detail-job.component.css']
})
export class DetailJobComponent implements OnInit {
  identifiant:number | null = 0;
  job:any;
  userConnect:any;
  applyJobs=false;
  message: any = {
    type: '',
    message: ''
  };
  constructor(private route : ActivatedRoute ,private HomePageService: HomePageService,private usagerService: UsagerService, private router: Router , private cdr: ChangeDetectorRef
    ) { }

  ngOnInit(): void {
      // Récupération du token depuis le local storage
      const storedToken = this.usagerService.getToken();
    
      if (storedToken) {   
                  // Décodage de la base64
        const decodedToken = atob(storedToken);
  
        // Parse du JSON pour obtenir l'objet original
        this. userConnect = JSON.parse(decodedToken);
      }
      
    this.identifiant = +this.route.snapshot.params['id'];
    this.HomePageService.getDetailJob( this.identifiant).subscribe(data=>{
      this.job = data                        
    })
  }
  applyJob() {
    // Assurez-vous que this.userConnect et this.job sont définis
    if (this.userConnect && this.job && this.job.ID) {
      // Utilisez le service pour postuler à l'emploi
      this.HomePageService.applyJob(this.userConnect.id, this.job.ID)
        .subscribe(
          // Succès de la requête
          (response) => {
            this.applyJobs=true ;
            this.cdr.detectChanges(); // Force la détection des changements
         
            let typeR = "error"
            if (<any>response ) {
              typeR = "success";
              this.message= "Votre demande d'emploi a été soumise avec success."
            }          
            ToastNotification.open({
              type: typeR,
              message: this.message
            });
            if (typeR == "success") {
              //this.router.navigate(['/applies-candidat',this.userConnect.id]);
            }
          },
          // Gestion des erreurs
          (error) => {
            ToastNotification.open({
              type: 'error',
              message: error.error.message
            });          
          }
        );
    } else {
      ToastNotification.open({
        type: 'error',
        message: this.message.message
      });
    }
  }

  bonjour(){
    alert('ok')
  }
  favoritesJob() {
    // Assurez-vous que this.userConnect et this.job sont définis
    if (this.userConnect && this.job && this.job.ID) {
      // Utilisez le service pour ajouter l'emploi aux favoris
      this.HomePageService.favoritesJob(this.userConnect.id, this.job.ID)
        .subscribe(
          // Succès de la requête
             (response) => {
              this.applyJobs=true ;
              let typeR = "error"
              if (<any>response ) {
                typeR = "success";
                this.message= "Votre nouveau job favori a été ajouté."
              }          
              ToastNotification.open({
                type: typeR,
                message: this.message
              });
              // if (typeR == "success") {
              //   this.router.navigate(['/applies-candidat',this.userConnect.id]);
              // }
            },
          // Gestion des erreurs
          (error) => {            
            ToastNotification.open({
              type: 'error',
              message: error.error.message
            }); 
          }
        );
    } else {      
      ToastNotification.open({
        type: 'error',
        message: this.message.message
      });  
    }
  }

}
