import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HomePageService } from 'src/app/services/home-page.service';
import { UsagerService } from 'src/app/services/usager.service';

@Component({
  selector: 'app-detail-challenge',
  templateUrl: './detail-challenge.component.html',
  styleUrls: ['./detail-challenge.component.css']
})
export class DetailChallengeComponent implements OnInit {

  challenge:any
  loading:boolean=true;
  slug:any;
  userConnect:any;
  candidate=false
  company=false
  constructor(private homeService:HomePageService,private datePipe: DatePipe ,private usagerService: UsagerService,private route : ActivatedRoute ,private router: Router) { }

  ngOnInit(): void {
    // Récupération du token depuis le local storage
    const storedToken = this.usagerService.getToken();
    this.slug = this.route.snapshot.params['slug'];

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
    this.homeService.getDetailChallenge(this.slug).subscribe((data:any)=>{
    this.challenge=data
    this.challenge.content=  this.challenge.content.replace(/<[^>]*>/g, '').replace(/[^\w\s]/gi, '')
    this.loading=false
    })
  }


}
