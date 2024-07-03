import { DatePipe } from '@angular/common';
import {AfterViewInit, Component, OnInit,HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Chart } from 'chart.js/auto';
import { HomePageService } from 'src/app/services/home-page.service';
import { UsagerService } from 'src/app/services/usager.service';

@Component({
  selector: 'app-dashboard-candidat',
  templateUrl: './dashboard-candidat.component.html',
  styleUrls: ['./dashboard-candidat.component.css']
})
export class DashboardCandidatComponent implements OnInit {
  p: number = 1;  someArrayOfThings!:any
  isSidebarVisible = false;
  isMobile!: boolean;
  chart: any;
  showButton = true;
  userConnect:any;
  homeCandidat:any;
  loading: boolean = true; 
  applicant:any
  currentDate!: Date;
  sentDate: any;
  suggestions:any;
  downloadLink!: string;

  constructor(private usagerService:UsagerService,private homeService:HomePageService,private datePipe: DatePipe) { 
    this.isMobile = window.innerWidth < 768; 
  }
 
  ngOnInit(): void {
    const storedToken = this.usagerService.getToken();
    
   if (storedToken) {   
               // Décodage de la base64
     const decodedToken = atob(storedToken);

     // Parse du JSON pour obtenir l'objet original
     this. userConnect = JSON.parse(decodedToken);
   }
    this.homeService.homeCandidat(this.userConnect.id).subscribe((data:any)=>{
      this.homeCandidat=data
      this.suggestions=this.homeCandidat.suggestions
      this.loading = false;
      this.suggestions.forEach((element:any) => {
        element.description =   element.description.replace(/<[^>]*>/g, '').replace(/[^\w\s]/gi, '');
      });

     })
     this.setDownloadLink();

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


  ngOnChanges() {
    this.currentDate = new Date();
    this.sentDate = this.datePipe.transform(this.currentDate, 'yyyy-MM-dd');
    if (Array.isArray(this.suggestions)) {
      this.suggestions.forEach((element: any) => {
        console.log(element.posted_at);
        
      const postedDate = new Date(element.posted_at);
      if (!isNaN(postedDate.getTime())) { // Check if postedDate is a valid date
        const postedDateFormatted = this.datePipe.transform(postedDate, 'yyyy-MM-dd');
        //element.posted_at = postedDateFormatted;
        const differenceInMs = this.currentDate.getTime() - postedDate.getTime();
        const differenceInDays = Math.floor(differenceInMs / (1000 * 60 * 60 * 24));
  
     
        if (differenceInDays > 30) {
          const differenceInMonths = Math.floor(differenceInDays / 30);
          element.duration = differenceInMonths + ' month(s)';
        } else {
          element.duration = differenceInDays + ' day(s)';
        }
      }
      });
    }
  }

  updateCachedData(){
    const cachedCandidat = localStorage.getItem('cachedCandidat');
    if (cachedCandidat) {
        let cachedData;
        try {
            cachedData = JSON.parse(cachedCandidat);
        } catch (error) {
            console.error('Error parsing cached data:', error);
        }

        if (cachedData) {
            this.homeCandidat = cachedData;
        } else {
            console.error('Cached data is not in the expected format.');
        }

    }
    this.homeService.getDetailCandidate(this.userConnect.id).subscribe(data => {
      if (data) {
          this.homeCandidat = data;
          localStorage.setItem('cachedCandidat', JSON.stringify(data));
      
      } 
      else {  
            console.error('Received data is not in the expected format.');
      }
    });
        
  }
  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
    console.log(this.isSidebarVisible);
    
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
  // ngAfterViewInit(): void {
  //   this.createChart();
  // }
  
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
