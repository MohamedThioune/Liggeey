import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HomePageService } from 'src/app/services/home-page.service';
import { UsagerService } from 'src/app/services/usager.service';

@Component({
  selector: 'app-item-all-challenges',
  templateUrl: './item-all-challenges.component.html',
  styleUrls: ['./item-all-challenges.component.css']
})
export class ItemAllChallengesComponent implements OnInit {
  currentCategories:any
  currentDate!: Date;
  sentDate: any;
  p: number = 1;
  @Input() category: any;
  userConnect:any;
  candidate=false;
  compagny=false;
  appliedJob=false
  isLoading: boolean = false;
  constructor(private homeService:HomePageService,private datePipe: DatePipe,private usagerService: UsagerService,private route : ActivatedRoute ,private router: Router) { }

  ngOnInit(): void {
          // Récupération du token depuis le local storage
          const storedToken = this.usagerService.getToken();
  
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
  }
  canAppl(item: any): boolean {
    if (!this.userConnect || !this.userConnect.id) {
      return true; // Si l'utilisateur n'est pas connecté, autoriser l'application
  }

    return !item.applied.some((appliedItem: any) => appliedItem.ID === this.userConnect.id);
  }
  
  openApplyModal(jobId: string,jobSlug:string) {
    this.homeService.setSelectedJobId(jobId,jobSlug);    
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
