import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HomePageService } from 'src/app/services/home-page.service';
import { UsagerService } from 'src/app/services/usager.service';
import { ToastNotification } from 'src/app/notification/ToastNotification';
import { DatePipe } from '@angular/common';

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
  searchTitle: string = ''; // Variable pour stocker la valeur de recherche
  searchLocation:string ='';
  isLoading: boolean = true;
  currentDate!: Date;
  sentDate: any;
  constructor(private homeService:HomePageService,private route : ActivatedRoute,private router: Router,private usagerService: UsagerService,private cdr: ChangeDetectorRef,private datePipe: DatePipe) {}

  ngOnInit(): void {
    this.currentDate = new Date();
    this.sentDate = this.datePipe.transform(this.currentDate, 'yyyy-MM-dd');
    this.identifiant = +this.route.snapshot.params['id'];
    this.homeService.getDetailCategory( this.identifiant).subscribe(data=>{
      this.category = data  
      this.category.jobs.forEach((element:any) => {
        const postedDate = new Date(element.posted_at);
        const postedDateFormatted = this.datePipe.transform(postedDate, 'yyyy-MM-dd');
        const differenceInMs = this.currentDate.getTime() - postedDate.getTime();
        const differenceInDays = Math.floor(differenceInMs / (1000 * 60 * 60 * 24));
    
     
        if (differenceInDays > 30) {
          const differenceInMonths = Math.floor(differenceInDays / 30);
          element.duration = differenceInMonths + ' month(s)';
        } else {
          element.duration = differenceInDays + ' day(s)';
        }
      });    
      setTimeout(() => {
        this.isLoading = false; // Cela masquera le loader
      },2000); // Délai de 2 secondes (ajustez selon vos besoins)
                           
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
 
  get filteredJobs() {
    if (this.searchTitle.trim() !== '' || this.searchLocation.trim() !== '') {
      return this.category.jobs.filter((job:any) => {
        const titleMatch = this.searchTitle.trim() === '' || job.title.toLowerCase().includes(this.searchTitle.toLowerCase());
        const placeMatch = this.searchLocation.trim() === '' || job.company.country.toLowerCase().includes(this.searchLocation.toLowerCase());
        return titleMatch && placeMatch;
      });
    } else {
      return this.category.jobs;
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




}