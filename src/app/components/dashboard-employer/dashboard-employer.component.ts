import { AfterViewInit, Component ,HostListener, OnInit} from '@angular/core';
import { Router } from '@angular/router';
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
  loading:boolean=true;
  userConnect:any;
  homeCompagny:any;
  applicant:any;
  userId!:string;
  downloadLink!: string;

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
  constructor(private usagerService:UsagerService,private homeService:HomePageService,private router: Router){

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
      this.homeCompagny=data;
      this.loading=false;
      this.homeCompagny.application.forEach((element:any) => {
        this.applicant=element 
        
       
      });
     })
     this.setDownloadLink();
  }
    ngAfterViewInit(): void {
      //this.createChart();
    }
    setDownloadLink() {
      const userAgent = window.navigator.userAgent.toLowerCase();
      if (userAgent.includes('safari') && !userAgent.includes('chrome')) {
        // Safari browser
        this.downloadLink = 'https://apps.apple.com/nl/app/livelearn/id1666976386';
      } else if (userAgent.includes('chrome')) {
        // Android browser
        this.downloadLink = 'https://play.google.com/store/apps/details?id=com.livelearn.livelearn_mobile_app&pli=1';
      } else {
        // Default link or other browsers
        this.downloadLink = 'https://play.google.com/store/apps/details?id=com.livelearn.livelearn_mobile_app&pli=1';
      }
    }
    send_id(id: any) {
      this.homeService.setCandidatId(id);
      localStorage.setItem('candidatId', id); // Stocker l'ID dans le localStorage
      this.router.navigate(['/detail-candidat'])
        .then(() => {
          window.location.reload();
        });
    }
  // createChart() {
  //   this.chart = new Chart('MyChart', {
  //     type: 'line',
  //     data: {
  //       labels: ['2022-05-10', '2022-05-11', '2022-05-12', '2022-05-13', '2022-05-14', '2022-05-15', '2022-05-16', '2022-05-17'],
  //       datasets: [
  //         {
  //           label: 'Sales',
  //           data: [467, 576, 572, 79, 92, 574, 573, 576],
  //           backgroundColor: 'blue'
  //         },
  //         {
  //           label: 'Profit',
  //           data: [542, 542, 536, 327, 17, 0.00, 538, 541],
  //           backgroundColor: 'limegreen'
  //         }
  //       ]
  //     },
  //     options: {
  //       aspectRatio: 2.5
  //     }
  //   });
  // }
}
