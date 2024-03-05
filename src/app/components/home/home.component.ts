import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { HomePageService } from 'src/app/services/home-page.service';
import { UsagerService } from 'src/app/services/usager.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  categoriesTab:any
  candidatsTab:string[]=[]
  topics:any
  sub:any
  categories:any;
  candidates:any;
  article:any;
  //jobs:any;
  descr:any;
  activeTab: string = 'all';
  currentCategories: any[] = [];
  date:any;
  userConnect:any;
  candidate=false;
  compagny=false;
  isLoading: boolean = true;
  searchTitle:string="";

  constructor(private homeService:HomePageService,private usagerService: UsagerService,private datePipe: DatePipe,
    ) { 
    
  }

  ngOnInit(): void {
    this.homeService.getInfoHomepage().subscribe((data:any)=>{
      this.categories=data.categories
      this.candidates=data.candidates
      console.log(this.candidates);
      
      this.article=data.artikels
      this.currentCategories=data.jobs  
      console.log(data.jobs);
      
      this.candidatsTab.push(this.candidates[2].image,this.candidates[3].image,this.candidates[4].image,this.candidates[6].image,this.candidates[7].image)                      
      this.article[0].post_title =   this.article[0].post_title.replace(/<[^>]*>/g, '').replace(/[^\w\s]/gi, '');
      this.article[0].short_description =   this.article[0].short_description.replace(/<[^>]*>/g, '').replace(/[^\w\s]/gi, '');
      this.article[1].post_title =   this.article[1].post_title.replace(/<[^>]*>/g, '').replace(/[^\w\s]/gi, '');
      this.article[1].short_description =   this.article[1].short_description.replace(/<[^>]*>/g, '').replace(/[^\w\s]/gi, '');
      this.article[2].short_description =   this.article[2].short_description.replace(/<[^>]*>/g, '').replace(/[^\w\s]/gi, '');
      this.article[2].post_title =   this.article[2].post_title.replace(/<[^>]*>/g, '').replace(/[^\w\s]/gi, '');
      setTimeout(() => {
        this.isLoading = false; // Cela masquera le loader
      },2000); // Délai de 2 secondes (ajustez selon vos besoins)
    })
    
    this.homeService.getCategories().subscribe((data:any)=>{
      this.categoriesTab=data.categories;
      this.topics=data.topics;
      this.sub=data.sub

      //this.currentCategories=this.categories      
    })
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


  
  
  changeTab(tab: string): void {
    this.activeTab = tab;

    if (tab === 'all') {
      this.currentCategories = this.categoriesTab;      
    } else if (tab === 'mainCategories') {
      this.currentCategories = this.categoriesTab;
    } else if (tab === 'topics') {
      this.currentCategories = this.topics;
    } else if (tab === 'sub') {
      this.currentCategories = this.sub;
    }
  }


}