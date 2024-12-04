import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HomePageService } from 'src/app/services/home-page.service';
import { UsagerService } from 'src/app/services/usager.service';

@Component({
  selector: 'app-list-challenges',
  templateUrl: './list-challenges.component.html',
  styleUrls: ['./list-challenges.component.css']
})
export class ListChallengesComponent implements OnInit {
  someArrayOfThings!:any
  currentColor: string = '#ECEDF2';
  isClass1Visible = true;
<<<<<<< HEAD
  jobs:any;
=======
  challenges:any;
>>>>>>> origin/delate-challenge
  job:any;
  p: number = 1;
  searchTitle: string = ''; // Variable pour stocker la valeur de recherche
  searchLocation:string ='';
  date:any;
  loading:boolean=true;
  currentDate!: Date;
  sentDate: any;
  identifiant:number | null = 0;
  userConnect:any;
  appliedJob=false
  candidate=false
  company=false
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
                this.company=true
                }
            }
<<<<<<< HEAD
        this.currentDate = new Date();
        this.sentDate = this.datePipe.transform(this.currentDate, 'yyyy-MM-dd');
        this.homeService.getAllJob().subscribe((data:any)=>{
          this.jobs=data
          this.loading=false
          //this.jobLoaded=true
          this.jobs.forEach((element:any) => {
            element.description= element.description.replace(/<[^>]*>/g, '').replace(/[^\w\s]/gi, '')
=======
          this.currentDate = new Date();
          this.sentDate = this.datePipe.transform(this.currentDate, 'yyyy-MM-dd');
          this.homeService.getChallenges().subscribe((data:any)=>{
          this.challenges=data          
          this.loading=false          
          this.challenges.forEach((element:any) => {
            element.content= element.content.replace(/<[^>]*>/g, '').replace(/[^\w\s]/gi, '')
>>>>>>> origin/delate-challenge
          });
        })
      }
      get filteredJobs() {
        if (this.searchTitle.trim() !== '' || this.searchLocation.trim() !== '') {
<<<<<<< HEAD
          return this.jobs.filter((job:any) => {
            const titleMatch = this.searchTitle.trim() === '' || job.title.toLowerCase().includes(this.searchTitle.toLowerCase());
            const placeMatch = this.searchLocation.trim() === '' || job.country.toLowerCase().includes(this.searchLocation.toLowerCase());
            return titleMatch && placeMatch;
          });
        } else {
          return this.jobs;
=======
          return this.challenges.filter((job:any) => {
            const titleMatch = this.searchTitle.trim() === '' || job.post_title.toLowerCase().includes(this.searchTitle.toLowerCase());
            const placeMatch = this.searchLocation.trim() === '' || job.company.title.toLowerCase().includes(this.searchLocation.toLowerCase());
            return titleMatch && placeMatch;
          });
        } else {
          return this.challenges;
>>>>>>> origin/delate-challenge
        }
  }

}
