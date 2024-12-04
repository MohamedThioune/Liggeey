import { Component, OnInit ,ChangeDetectorRef} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HomePageService } from 'src/app/services/home-page.service';
import { UsagerService } from 'src/app/services/usager.service';
import { ToastNotification } from 'src/app/notification/ToastNotification';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-detail-job',
  templateUrl: './detail-job.component.html',
  styleUrls: ['./detail-job.component.css']
})
export class DetailJobComponent implements OnInit {

  currentDate!: Date;
  sentDate: any;
  identifiant:any;
  job:any;
  userConnect:any;
  applyJobs=false;
  loading:boolean=true
  message: any = {
    type: '',
    message: ''
  };
  selectedFileName: string | undefined;
  public href: string = "";
  company=false;
  candidate=false;
  canApply=true
  isBookmarked: boolean = false;
  slug:any;
  constructor(private route : ActivatedRoute ,private HomePageService: HomePageService,private usagerService: UsagerService, private router: Router , private cdr: ChangeDetectorRef,private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.href = window.location.href;

    // Récupération du token depuis le local storage
    const storedToken = this.usagerService.getToken();

    if (storedToken) {
        // Décodage de la base64
        const decodedToken = atob(storedToken);

        // Parse du JSON pour obtenir l'objet original
        this.userConnect = JSON.parse(decodedToken);
        if(this.userConnect.acf.is_liggeey == "candidate"){
          this.candidate=true

        } else if(this.userConnect.acf.is_liggeey == "chief"){
          this.company=true
        }
    }
    this.slug = this.route.snapshot.params['slug'];
    if (this.userConnect && this.userConnect.id) {
      this.HomePageService.getOneJob(this.slug,this.userConnect.id).subscribe(data => {
        this.job = data;
        this.loading=false
        
       //this.job.description = this.job.description.replace(/<[^>]*>|[#&]/g, '');
       //this.job.description= this.job.description.replace(/<[^>]*>/g, '').replace(/[^\w\s]/gi, '')
      this.job.other_jobs.forEach((element:any) => {
      element.description= this.job.description.replace(/<[^>]*>/g, '').replace(/[^\w\s]/gi, '')

      });


        this.calculateDuration();
        this.calculateDurationLastJob();
    });
    }else{
      this.HomePageService.getDetailJob(this.slug).subscribe(data => {
        this.job = data;
        this.loading=false
        
       //this.job.description = this.job.description.replace(/<[^>]*>|[#&]/g, '');
       //this.job.description= this.job.description.replace(/<[^>]*>/g, '').replace(/[^\w\s]/gi, '')
      this.job.other_jobs.forEach((element:any) => {
      element.description= this.job.description.replace(/<[^>]*>/g, '').replace(/[^\w\s]/gi, '')

      });


        this.calculateDuration();
        this.calculateDurationLastJob();
    });
    }
   
}
formatTextToHTML(text: string): string {
  // On suppose que chaque ligne du texte est séparée par un retour à la ligne
  const lines = text.split('\n').filter(line => line.trim() !== '');
  const listItems = lines.map(line => `<p>${line}</p>`).join('');
  return `${listItems}`;
}

canAppl(item: any): boolean {
  if (!this.userConnect || !this.userConnect.id) {
    return true; // Si l'utilisateur n'est pas connecté, autoriser l'application
}

if (item && item.applied) {
  return !item.applied.some((appliedItem: any) => appliedItem.ID === this.userConnect.id);
}

return true;
}
calculateDuration() {
    if (this.job) {
        this.currentDate = new Date();
        this.sentDate = this.datePipe.transform(this.currentDate, 'yyyy-MM-dd');

        const postedDate = new Date(this.job.posted_at);

        if (!isNaN(postedDate.getTime())) {
            const differenceInMs = this.currentDate.getTime() - postedDate.getTime();
            const differenceInDays = Math.floor(differenceInMs / (1000 * 60 * 60 * 24));

            if (differenceInDays > 30) {
                const differenceInMonths = Math.floor(differenceInDays / 30);
                this.job.duration = differenceInMonths + ' month(s)';
            } else {
                this.job.duration = differenceInDays + ' day(s)';
            }
        }
    }
}
calculateDurationLastJob(){
  this.currentDate = new Date();
    this.sentDate = this.datePipe.transform(this.currentDate, 'yyyy-MM-dd');
      //this.job=this.job.other_jobs
      this.job.other_jobs.forEach((element:any) => {
        const postedDate = new Date(element.post_date);
       // const postedDateFormatted = this.datePipe.transform(postedDate, 'yyyy-MM-dd');
        const differenceInMs = this.currentDate.getTime() - postedDate.getTime();
        const differenceInDays = Math.floor(differenceInMs / (1000 * 60 * 60 * 24));


        if (differenceInDays > 30) {
          const differenceInMonths = Math.floor(differenceInDays / 30);
          element.duration = differenceInMonths + ' month(s)';
        } else {
          element.duration = differenceInDays + ' day(s)';
        }

      });
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
      this.router.navigate(['/login']);
    }
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
                this.message= response
                this.isBookmarked = true;
              }
              ToastNotification.open({
                type: typeR,
                message: this.message
              });
             window.location.reload();
              this.router.navigate(['/favorite',this.userConnect.slug])
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
        message: "please log in first"
      });
      this.router.navigate(['/login']);

    }
  }

  isArray(value: any): boolean {
    return Array.isArray(value);
  }
  ngOnChanges() {
    this.currentDate = new Date();
    this.sentDate = this.datePipe.transform(this.currentDate, 'yyyy-MM-dd');

      const postedDate = new Date(this.job.posted_at);
      if (!isNaN(postedDate.getTime())) { // Check if postedDate is a valid date
        const postedDateFormatted = this.datePipe.transform(postedDate, 'yyyy-MM-dd');
     //   element.posted_at = postedDateFormatted;
        const differenceInMs = this.currentDate.getTime() - postedDate.getTime();
        const differenceInDays = Math.floor(differenceInMs / (1000 * 60 * 60 * 24));


        if (differenceInDays > 30) {
          const differenceInMonths = Math.floor(differenceInDays / 30);
          this.job.duration = differenceInMonths + ' month(s)';
        } else {
          this.job.duration = differenceInDays + ' day(s)';
        }
      }

    }

    openApplyModal(jobId: string,jobSlug:string) {
      this.HomePageService.setSelectedJobId(jobId,jobSlug);
      const modalElement = document.getElementById('modal-apply');
      if (modalElement) {
        modalElement.click();
      } else {
        console.error("Modal element not found");
      }
    }
    send_id(id: any) {
      this.router.navigate(['/detail-job',id])
        .then(() => {
          window.location.reload();
        });
    }

}
