import { Component, OnInit } from '@angular/core';
import { HomePageService } from 'src/app/services/home-page.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  jobs:any;

  constructor(private homeService:HomePageService) { }

  ngOnInit(): void {
    this.homeService.getAllJob().subscribe((data:any)=>{
      this.jobs=data
      console.log(this.jobs);
      
    })
  }

}
