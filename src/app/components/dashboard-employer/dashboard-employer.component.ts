import { AfterViewInit, Component ,HostListener, OnInit} from '@angular/core';
import { Chart } from 'chart.js/auto';
import { HomePageService } from 'src/app/services/home-page.service';
import { UsagerService } from 'src/app/services/usager.service';

@Component({
  selector: 'app-dashboard-employer',
  templateUrl: './dashboard-employer.component.html',
  styleUrls: ['./dashboard-employer.component.css']
})
export class DashboardEmployerComponent implements OnInit,AfterViewInit {
  chart: any;
  p: number = 1;  someArrayOfThings!:any
  isSidebarVisible = false;
  showButton = true;
  isMobile!: boolean;
  userConnect:any;
  homeCompagny:any;
  applicant:any

  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
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
  constructor(private usagerService:UsagerService,private homeService:HomePageService){

  }
  ngOnInit(): void {
     // Récupération du token depuis le local storage
   const storedToken = this.usagerService.getToken();
    
   if (storedToken) {   
               // Décodage de la base64
     const decodedToken = atob(storedToken);

     // Parse du JSON pour obtenir l'objet original
     this. userConnect = JSON.parse(decodedToken);
   }
    this.homeService.homeCompagny(this.userConnect.id).subscribe((data:any)=>{
      this.homeCompagny=data
      console.log(this.homeCompagny);
      
      
      this.homeCompagny.application.forEach((element:any) => {
        this.applicant=element        
      });
     })
  }
    ngAfterViewInit(): void {
      this.createChart();
    }

  createChart() {
    this.chart = new Chart('MyChart', {
      type: 'line',
      data: {
        labels: ['2022-05-10', '2022-05-11', '2022-05-12', '2022-05-13', '2022-05-14', '2022-05-15', '2022-05-16', '2022-05-17'],
        datasets: [
          {
            label: 'Sales',
            data: [467, 576, 572, 79, 92, 574, 573, 576],
            backgroundColor: 'blue'
          },
          {
            label: 'Profit',
            data: [542, 542, 536, 327, 17, 0.00, 538, 541],
            backgroundColor: 'limegreen'
          }
        ]
      },
      options: {
        aspectRatio: 2.5
      }
    });
  }
}
