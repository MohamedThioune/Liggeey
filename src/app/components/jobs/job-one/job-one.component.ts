import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HomePageService } from 'src/app/services/home-page.service';

@Component({
  selector: 'app-job-one',
  templateUrl: './job-one.component.html',
  styleUrls: ['./job-one.component.css']
})
export class JobOneComponent implements OnInit {
  someArrayOfThings!:any
  currentColor: string = '#ECEDF2';
  isClass1Visible = true;
  jobs:any
  p: number = 1;
  searchTitle: string = ''; // Variable pour stocker la valeur de recherche
  searchLocation:string ='';
  date:any;
  currentDate!: Date;
  sentDate: any;


  constructor(private homeService:HomePageService,private datePipe: DatePipe) {}
  ngOnInit(): void {
    this.currentDate = new Date();
    this.sentDate = this.datePipe.transform(this.currentDate, 'yyyy-MM-dd');
    this.homeService.getInfoHomepage().subscribe((data:any)=>{  
      this.jobs=data.jobs
      this.jobs.forEach((element:any) => {
        const postedDate = new Date(element.posted_at);
        const postedDateFormatted = this.datePipe.transform(postedDate, 'yyyy-MM-dd');
        const differenceInMs = this.currentDate.getTime() - postedDate.getTime();
        const differenceInDays = Math.floor(differenceInMs / (1000 * 60 * 60 * 24));
  
     
        if (differenceInDays > 30) {
          const differenceInMonths = Math.floor(differenceInDays / 30);
          element.duration = differenceInMonths + ' month(s)';
        } else {
          element.duration = differenceInDays + ' day(s)';
        }
                
      });      
    })
  }
  get filteredJobs() {
    if (this.searchTitle.trim() !== '' || this.searchLocation.trim() !== '') {
      return this.jobs.filter((job:any) => {
        const titleMatch = this.searchTitle.trim() === '' || job.title.toLowerCase().includes(this.searchTitle.toLowerCase());
        const placeMatch = this.searchLocation.trim() === '' || job.company.country.toLowerCase().includes(this.searchLocation.toLowerCase());
        return titleMatch && placeMatch;
      });
    } else {
      return this.jobs;
    }
  }
  
  changeColor() {
    this.currentColor = '#1AC4A2'; // Changez la couleur selon vos besoins
  }
  currentChangeColor() {
    this.currentColor = '#1AC4A2'; // Changez la couleur selon vos besoins
  }
 
  toggleClass() {
    this.isClass1Visible = !this.isClass1Visible;
  }

}
