import { Component, OnInit } from '@angular/core';
import { HomePageService } from '../services/home-page.service';
import { DatePipe } from '@angular/common';
import { UsagerService } from '../services/usager.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-skeleton-list-challenges',
  templateUrl: './skeleton-list-challenges.component.html',
  styleUrls: ['./skeleton-list-challenges.component.css']
})
export class SkeletonListChallengesComponent implements OnInit {
  someArrayOfThings!:any
  currentColor: string = '#ECEDF2';
  isClass1Visible = true;
  challenges:any;
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
    this.currentDate = new Date();
    this.sentDate = this.datePipe.transform(this.currentDate, 'yyyy-MM-dd');
    this.homeService.getChallenges().subscribe((data:any)=>{
      this.challenges=data
      this.loading=false      
      this.challenges.forEach((element:any) => {
        element.content= element.content.replace(/<[^>]*>/g, '').replace(/[^\w\s]/gi, '')
      });
    })
    }
    get filteredJobs() {
      if (this.searchTitle.trim() !== '' || this.searchLocation.trim() !== '') {
        return this.challenges.filter((job:any) => {
          const titleMatch = this.searchTitle.trim() === '' || job.title.toLowerCase().includes(this.searchTitle.toLowerCase());
          const placeMatch = this.searchLocation.trim() === '' || job.country.toLowerCase().includes(this.searchLocation.toLowerCase());
          return titleMatch && placeMatch;
        });
      } else {
        return this.challenges;
      }

    }
  }