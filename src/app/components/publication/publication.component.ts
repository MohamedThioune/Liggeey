import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HomePageService } from 'src/app/services/home-page.service';
import { UsagerService } from 'src/app/services/usager.service';
import { ToastNotification } from 'src/app/notification/ToastNotification';

@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.css']
})
export class PublicationComponent implements OnInit {

  userConnect:any;
  categories:any
  category:any
  candidate=false;
  compagny=false;
  identifiant:number | null = 0;
  message: any = {
    type: '',
    message: ''
  };

  constructor(private usagerService: UsagerService,private homeService:HomePageService,private route : ActivatedRoute ,private router: Router) { }

  ngOnInit(): void {

  }
  submit(){
        // Récupération du token depuis le local storage
        const storedToken = this.usagerService.getToken();
        this.identifiant = +this.route.snapshot.params['id'];
    
        if (storedToken) {
                    // Décodage de la base64
          const decodedToken = atob(storedToken);
    
    
          // Parse du JSON pour obtenir l'objet original
          this. userConnect = JSON.parse(decodedToken);
          if(this.userConnect.acf.is_liggeey !== "chief"){
            ToastNotification.open({
              type: 'error',
              message: `this space is dedicated to employers`
            });
          } else if(this.userConnect.acf.is_liggeey == "chief"){
              this.router.navigate(['/post-compagny']);
            }
        }else{
        this.router.navigate(['/login']);
        }

  }


}
