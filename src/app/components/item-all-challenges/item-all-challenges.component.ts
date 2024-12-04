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

}
