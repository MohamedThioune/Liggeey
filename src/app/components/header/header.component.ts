import { Component, OnInit,HostListener } from '@angular/core';
import { Usager } from 'src/app/interfaces/usager';
import { UsagerService } from 'src/app/services/usager.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isMobile!: boolean;
  userConnect:any;
  candidate=false;
  compagny=false;
  constructor(private usagerService: UsagerService) { 
    this.isMobile = window.innerWidth < 768; 

  }

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

  options = [
    {
  id: 1, name: 'Option 1' },
      { 
     
  id: 2, name: 'Option 2' },
      { 
    
  id: 3, name: 'Option 3' },
  
 ]
 selectedOption: number = 1; // default selected option
 deconnexion(){
  this.usagerService.deconnexion()
}
}
