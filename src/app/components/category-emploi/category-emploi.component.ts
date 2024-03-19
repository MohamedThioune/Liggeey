import { DatePipe } from '@angular/common';
import { Component, OnInit,Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HomePageService } from 'src/app/services/home-page.service';
import { UsagerService } from 'src/app/services/usager.service';

@Component({
  selector: 'app-category-emploi',
  templateUrl: './category-emploi.component.html',
  styleUrls: ['./category-emploi.component.css']
})
export class CategoryEmploiComponent implements OnInit {
  currentCategories:any
  currentDate!: Date;
  sentDate: any;
  p: number = 1;
  @Input() category: any;
  userConnect:any;
  candidate=false;
  compagny=false;
  identifiant:number | null = 0;
  appliedJob=false

  constructor(private homeService:HomePageService,private datePipe: DatePipe,private usagerService: UsagerService,private route : ActivatedRoute ,private router: Router) { }

  ngOnInit(): void {
    // Récupération du token depuis le local storage
    const storedToken = this.usagerService.getToken();
    this.identifiant = +this.route.snapshot.params['id'];

    if (storedToken) {
                // Décodage de la base64
      const decodedToken = atob(storedToken);

      // Parse du JSON pour obtenir l'objet original
      this. userConnect = JSON.parse(decodedToken);
      if(this.userConnect.acf.is_liggeey == "candidate"){
        this.candidate=true
      } else if(this.userConnect.acf.is_liggeey == "chief"){
        this.compagny=true
        
      }
    }
    this.category.jobs.forEach((job:any) => {
      console.log(job);
      job.applied.forEach((element:any)=>{
        if (element=this.userConnect) {
          this.appliedJob=true
          
        }
      
      })
      
      
    });
  
  }

  openApplyModal(jobId: string) {
    this.homeService.setSelectedJobId(jobId);
    console.log(jobId);
    
    const modalElement = document.getElementById('modal-apply');
    if (modalElement) {
      modalElement.click();
    } else {
      console.error("Modal element not found");
    }
  }

  ngOnChanges() {
    this.currentDate = new Date();
    this.sentDate = this.datePipe.transform(this.currentDate, 'yyyy-MM-dd');
    if (Array.isArray(this.category)) {
      this.category.forEach((element: any) => {
      const postedDate = new Date(element.posted_at);
      if (!isNaN(postedDate.getTime())) { // Check if postedDate is a valid date
        const postedDateFormatted = this.datePipe.transform(postedDate, 'yyyy-MM-dd');
     //   element.posted_at = postedDateFormatted;
        const differenceInMs = this.currentDate.getTime() - postedDate.getTime();
        const differenceInDays = Math.floor(differenceInMs / (1000 * 60 * 60 * 24));
  
     
        if (differenceInDays > 30) {
          const differenceInMonths = Math.floor(differenceInDays / 30);
          element.duration = differenceInMonths + ' month(s)';
        } else {
          element.duration = differenceInDays + ' day(s)';
        }
      }
      });
    }
  }
}

        
 


