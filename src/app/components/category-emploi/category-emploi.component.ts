import { DatePipe } from '@angular/common';
import { Component, OnInit,Input } from '@angular/core';
import { HomePageService } from 'src/app/services/home-page.service';

@Component({
  selector: 'app-category-emploi',
  templateUrl: './category-emploi.component.html',
  styleUrls: ['./category-emploi.component.css']
})
export class CategoryEmploiComponent implements OnInit {
  currentCategories:any
  currentDate!: Date;
  sentDate: any;
  p: number = 1;
  @Input() category: any;
  
  constructor(private homeService:HomePageService,private datePipe: DatePipe) { }

  ngOnInit(): void {
  
  }

  ngOnChanges() {
    this.currentDate = new Date();
    this.sentDate = this.datePipe.transform(this.currentDate, 'yyyy-MM-dd');
    if (Array.isArray(this.category)) {
      this.category.forEach((element: any) => {
      const postedDate = new Date(element.posted_at);
      if (!isNaN(postedDate.getTime())) { // Check if postedDate is a valid date
        const postedDateFormatted = this.datePipe.transform(postedDate, 'yyyy-MM-dd');
     //   element.posted_at = postedDateFormatted;
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
}

        
 


