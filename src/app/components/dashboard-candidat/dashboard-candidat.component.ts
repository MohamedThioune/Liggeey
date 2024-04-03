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
  homeCandidate:any;
  applicant:any
  currentDate!: Date;
  sentDate: any;
  identifiant:number | null = 0;
  candidat:any
  constructor(private route : ActivatedRoute,private usagerService:UsagerService,private homeService:HomePageService,private datePipe: DatePipe) { 
    this.isMobile = window.innerWidth < 768; 
  }
 
  ngOnInit(): void {
    this.identifiant = +this.route.snapshot.params['id'];  
    this.homeService.homeCandidat(this.identifiant).subscribe((data:any)=>{
      this.homeCandidate=data
     })
 
  }

  ngOnChanges() {
    this.currentDate = new Date();
    this.sentDate = this.datePipe.transform(this.currentDate, 'yyyy-MM-dd');
    if (Array.isArray(this.homeCandidate.suggestions)) {
      this.homeCandidate.suggestions.forEach((element: any) => {
        
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
