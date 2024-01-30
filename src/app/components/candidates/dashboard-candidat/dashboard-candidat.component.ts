import {AfterViewInit, Component, OnInit,HostListener } from '@angular/core';
import { Chart } from 'chart.js/auto';

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

  constructor() { 
    this.isMobile = window.innerWidth < 768; 

  }
 
  ngOnInit(): void {}

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
  collection: any[] = this.someArrayOfThings=[
    {
      "color":"#4947D0",
      "profil":"Catalyst",
      "location":"Dakar",
      "timezone":"11",
      "logo": "../../../assets/img/Rectangle 111.png",
      "domaine":"Figma"
    },
    {
      "profil":"Figma",
      "location":"Nederland, NL",
      "timezone":"11",
      "logo": "../../../assets/img/Rectangle 112.png",
      "domaine":"Php"
    }
    ,{
      "profil":"Catalyst",
      "location":"Dakar",
      "timezone":"11",
      "logo": "../../../assets/img/Rectangle 111.png",
      "domaine":"Figma"
    },
    {
      "profil":"Figma",
      "location":"Nederland, NL",
      "timezone":"11",
      "logo": "../../../assets/img/Rectangle 112.png",
      "domaine":"Php"
    },
    {
      "profil":"Catalyst",
      "location":"Dakar",
      "timezone":"11",
      "logo": "../../../assets/img/Rectangle 111.png",
      "domaine":"Figma"
    },
    {
      "profil":"Figma",
      "location":"Nederland, NL",
      "timezone":"11",
      "logo": "../../../assets/img/Rectangle 112.png",
      "domaine":"php"
    },
    {
      "color":"#4947D0",
      "profil":"Catalyst",
      "location":"Dakar",
      "timezone":"11",
      "logo": "../../../assets/img/Rectangle 111.png",
      "domaine":"Figma"
    },
    {
      "profil":"Figma",
      "location":"Nederland, NL",
      "timezone":"11",
      "logo": "../../../assets/img/Rectangle 112.png",
      "domaine":"Php"
    }
    ,{
      "profil":"Catalyst",
      "location":"Dakar",
      "timezone":"11",
      "logo": "../../../assets/img/Rectangle 111.png",
      "domaine":"Figma"
    },
    {
      "profil":"Figma",
      "location":"Nederland, NL",
      "timezone":"11",
      "logo": "../../../assets/img/Rectangle 112.png",
      "domaine":"Php"
    },
    {
      "profil":"Catalyst",
      "location":"Dakar",
      "timezone":"11",
      "logo": "../../../assets/img/Rectangle 111.png",
      "domaine":"Figma"
    },
    {
      "profil":"Figma",
      "location":"Nederland, NL",
      "timezone":"11",
      "logo": "../../../assets/img/Rectangle 112.png",
      "domaine":"Php"
    }
  ];
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
  public options: any = {
    Chart: {
      type: 'area',
      height: 700
    },
    title: {
      text: 'Evolution de la population'
    },
    credits: {
      enabled: false
    },
    xAxis: {
      categories: ['1750', '1800', '1850', '1900', '1950', '1999', '2050'] 
,
      tickmarkPlacement: 'on',
      title: {
          enabled: false
      }
  },
    series: 
[{
      name: 'Asia',
      data: [502, 635, 809, 947, 1402, 3634, 5268] 
  }, {
      name: 'Europe',
      data: [163, 203, 276, 408, 547, 729, 628] 
  }, {
      name: 'America',
      data: [18, 31, 54, 156, 339, 818, 1201] 
  }],


}
}
