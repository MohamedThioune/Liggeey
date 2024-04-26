import { Component, OnInit ,HostListener} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HomePageService } from 'src/app/services/home-page.service';
import { UsagerService } from 'src/app/services/usager.service';

@Component({
  selector: 'app-applies-jobs',
  templateUrl: './applies-jobs.component.html',
  styleUrls: ['./applies-jobs.component.css']
})
export class AppliesJobsComponent implements OnInit {
  p: number = 1;  someArrayOfThings!:any
  isSidebarVisible = false;
  showButton = true;
  loading:boolean=true;
  isMobile!: boolean;
  identifiant:number | null = 0;
  applies:any;
  formattedDate!: string;

  constructor(private route : ActivatedRoute ,private router: Router,private HomePageService: HomePageService,private usagerService: UsagerService) {
    this.isMobile = window.innerWidth < 768; 
   }
   
   ngOnInit(): void {
    this.identifiant = +this.route.snapshot.params['id'];    
    this.HomePageService.appliesJob( this.identifiant).subscribe(data=>{
      this.applies=data  
      console.log(this.applies);
      this.loading=false
      
      this.applies.forEach((element:any) => {
        const date = new Date(element.posted_at);
        element.date = this.formatDate(date);

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
  
  getStatusStyle(status: string): any {
    switch (status) {
      case 'Processing':
        return { color: '#696969' };
      case 'Approved':
        return { color: '#1AC4A2' };
      case 'Rejected':
        return { color: 'red' };
      default:
        return {}; // Default style
    }
  }
  

   @HostListener('window:resize', ['$event'])
   onResize(event:Event) {
     this.isMobile = window.innerWidth < 768; 
   }
 
   isWebScreen(): boolean {
     return !this.isMobile;
   }
 
   isMobileScreen(): boolean {
     return this.isMobile;
   }

}
