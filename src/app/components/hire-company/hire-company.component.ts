import { Component, OnInit } from '@angular/core';
import { HomePageService } from 'src/app/services/home-page.service';
import { UsagerService } from 'src/app/services/usager.service';
import { ToastNotification } from 'src/app/notification/ToastNotification';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hire-company',
  templateUrl: './hire-company.component.html',
  styleUrls: ['./hire-company.component.css']
})
export class HireCompanyComponent implements OnInit {
  userConnect:any;

  constructor(private homeService:HomePageService,private usagerService: UsagerService,private router: Router) { }

  ngOnInit(): void {
    const storedToken = this.usagerService.getToken();
    
    if (storedToken) {   
                // Décodage de la base64
      const decodedToken = atob(storedToken);
 
      // Parse du JSON pour obtenir l'objet original
      this. userConnect = JSON.parse(decodedToken);
    }
  }
  redirectToWhatsApp(){
    this.homeService.redirectToWhatsApp()
  }
  redirectToPostCompany(){

    if (!this.userConnect) {
      ToastNotification.open({
        type: 'error',
        message: 'log in as a company to publish a job.'
      });
      this.router.navigate(['login'])
      return; 
    }else{
      this.router.navigate(['post-company'])
    } 
 
 
   }
}
