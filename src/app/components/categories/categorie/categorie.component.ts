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
  loading:boolean=true;
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
  currentDate!: Date;
  sentDate: any;
  canApply=true;
  slug:any
  selectedSkillsText: string = '';
  skills: string[] = ['Google','Google Workspace', 'Microsoft', 'Account management', 'Accounting', 'Acquiring', 'Administration', 'Administration and Reporting',];
  selectedSkills: string[] = [];
  showDropdownSkills: boolean = false
  constructor(private homeService:HomePageService,private route : ActivatedRoute,private router: Router,private usagerService: UsagerService,private cdr: ChangeDetectorRef,private datePipe: DatePipe) {}

  ngOnInit(): void {
    this.identifiant = +this.route.snapshot.params['id'];
    this.slug = this.route.snapshot.params['slug'];
    this.currentDate = new Date();
    this.sentDate = this.datePipe.transform(this.currentDate, 'yyyy-MM-dd');
    this.homeService.getDetailCategory( this.slug).subscribe(data=>{
      this.category = data
      this.loading=false;

      this.category.jobs.forEach((element:any) => {
         // Vérifier si l'utilisateur est contenu dans applied[] pour cet élément
          if (element.applied.some((appliedItem: any) => appliedItem.ID === this.userConnect.id)) {
            // Si l'utilisateur est trouvé, canApply devient false
            this.canApply = false;
           // console.log('L\'utilisateur est déjà postulé à ce job.');
          } else {
            this.canApply = true
            // Sinon, canApply reste true
           // console.log('L\'utilisateur n\'a pas encore postulé à ce job.');
          }


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


    })
    this.homeService.getDetailCategory(this.slug).subscribe((data:any)=>{
      this.category = data
      this.category.articles.forEach((element:any) => {
        element.short_description =   element.short_description.replace(/<[^>]*>/g, '').replace(/[^\w\s]/gi, '');
        element.title =   element.post_title.replace(/<[^>]*>/g, '').replace(/[^\w\s]/gi, '');
        element.description =   element.description.replace(/<[^>]*>/g, '').replace(/[^\w\s]/gi, '');
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
  // get filteredJobs() {
  //   if (this.searchTitle.trim() !== '' || this.searchLocation.trim() !== '') {
  //     return this.category.jobs.filter((job:any) => {
  //       const titleMatch = this.searchTitle.trim() === '' || job.title.toLowerCase().includes(this.searchTitle.toLowerCase());
  //       const placeMatch = this.searchLocation.trim() === '' || job.company.place.toLowerCase().includes(this.searchLocation.toLowerCase());
  //       return titleMatch && placeMatch;
  //     });
  //   } else {
  //     return this.category.jobs;
  //   }
  // }
  get filteredItems() {
    if (this.searchTitle.trim() !== '' || this.searchLocation.trim() !== '' || this.selectedSkillsText.trim() !=='') {
      const filteredJobs = this.category.jobs.filter((job: any) => {
        const titleMatch = this.searchTitle.trim() === '' || job.title.toLowerCase().includes(this.searchTitle.toLowerCase());
        const placeMatch = this.searchLocation.trim() === '' || job.company.place.toLowerCase().includes(this.searchLocation.toLowerCase());
        const skills = this.selectedSkillsText.trim() === '' || job.skills.some((skill: any) => skill.name.toLowerCase().includes(this.selectedSkillsText.toLowerCase()));
        return titleMatch && placeMatch && skills;
      });
  
      const filteredArticles = this.category.articles.filter((article: any) => {
        const titleMatch = this.searchTitle.trim() === '' || article.title.toLowerCase().includes(this.searchTitle.toLowerCase());
        return titleMatch;
      });
  
      const filteredCompanies = this.category.companies.filter((company: any) => {
        const titleMatch = this.searchTitle.trim() === '' || company.title.toLowerCase().includes(this.searchTitle.toLowerCase());
        const placeMatch = this.searchLocation.trim() === '' || company.place.toLowerCase().includes(this.searchLocation.toLowerCase());

        return titleMatch && placeMatch;
      });

      return {
        jobs: filteredJobs,
        articles: filteredArticles,
        companies: filteredCompanies
      };
    } else {
      return {
        jobs: this.category.jobs,
        articles: this.category.articles,
        companies: this.category.companies
      };
    }
  }
  
  
  toggleDropdownSkills() {
      this.showDropdownSkills = !this.showDropdownSkills;
  }

  onSkillChange(skill: string, event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.selectedSkills.push(skill);
    } else {
      this.selectedSkills = this.selectedSkills.filter(s => s !== skill);
    }
    this.updateSelectedSkillsText();
  }

  isSelected(skill: string): boolean {
    return this.selectedSkills.includes(skill);
  }

  updateSelectedSkillsText() {
    this.selectedSkillsText = this.selectedSkills.join(', ');
  }
  canAppl(item: any): boolean {
    if (!this.userConnect || !this.userConnect.id) {
      return true; // Si l'utilisateur n'est pas connecté, autoriser l'application
  }

    return !item.applied.some((appliedItem: any) => appliedItem.ID === this.userConnect.id);
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

  openApplyModal(jobId: string,jobSlug:string) {
    this.homeService.setSelectedJobId(jobId,jobSlug);
    const modalElement = document.getElementById('modal-apply');
    if (modalElement) {
      modalElement.click();
    } else {
      //console.error("Modal element not found");
    }
  }
  showAlreadyAppliedAlert() {
    alert('Vous avez déjà postulé à ce job.');
}


}
