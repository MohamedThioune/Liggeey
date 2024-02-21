import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HomePageService } from 'src/app/services/home-page.service';
import { UsagerService } from 'src/app/services/usager.service';
import { ToastNotification } from 'src/app/notification/ToastNotification';

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.css']
})
export class CategorieComponent implements OnInit {
  someArrayOfThings!:any
  categories:any;
  artikels:any
  candidates:any
  p: number = 1;
  identifiant:number | null = 0;
  category:any;
  title!: string;
  location!: string;
  categori!:string;
  userConnect:any;
  applyJobs=false;
  message: any = {
    type: '',
    message: ''
  };
  job:any;

  constructor(private homeService:HomePageService,private route : ActivatedRoute,private router: Router,private usagerService: UsagerService,private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.identifiant = +this.route.snapshot.params['id'];
    this.homeService.getDetailCategory( this.identifiant).subscribe(data=>{
      this.category = data  
      this.category.jobs.forEach((element:any) => {
        this.job=element        
      }); 
                           
    })
    this.homeService.getInfoHomepage().subscribe((data:any)=>{
      this.categories=data.categories
      this.candidates=data.candidates
      this.artikels=data.artikels      
      this.artikels.forEach((element:any) => {
        element.short_description =   element.short_description.replace(/<[^>]*>/g, '').replace(/[^\w\s]/gi, '');
        element.post_title =   element.post_title.replace(/<[^>]*>/g, '').replace(/[^\w\s]/gi, '');
      });
      
    })
    // Récupération du token depuis le local storage
    const storedToken = this.usagerService.getToken();
    
    if (storedToken) {   
                // Décodage de la base64
      const decodedToken = atob(storedToken);

      // Parse du JSON pour obtenir l'objet original
      this. userConnect = JSON.parse(decodedToken);
    }
  }

  favoritesJob() {
    // Assurez-vous que this.userConnect et this.job sont définis
    if (this.userConnect && this.job && this.job.ID) {
      // Utilisez le service pour ajouter l'emploi aux favoris
      this.homeService.favoritesJob(this.userConnect.id, this.job.ID)
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

  submit(): void {
    // Naviguer vers la route de recherche avec les paramètres de recherche
    this.router.navigate(['/recherche'], {
      queryParams: {
        title: this.job.title,
        location: this.job.company.country,
        category: this.category.name,
      }
    });
}


}