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
  isMobile!: boolean;
  identifiant:number | null = 0;
  applies:any;

  constructor(private route : ActivatedRoute ,private router: Router,private HomePageService: HomePageService,private usagerService: UsagerService) {
    this.isMobile = window.innerWidth < 768; 
   }
   
   ngOnInit(): void {
    this.identifiant = +this.route.snapshot.params['id'];    
    this.HomePageService.appliesJob( this.identifiant).subscribe(data=>{
      this.applies=data      
      console.log(this.applies);
    })
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
