import { Component, OnInit } from '@angular/core';
import { HomePageService } from 'src/app/services/home-page.service';

@Component({
  selector: 'app-list-candidates',
  templateUrl: './list-candidates.component.html',
  styleUrls: ['./list-candidates.component.css']
})
export class ListCandidatesComponent implements OnInit {
  categoriesTab:any
  topics:any
  sub:any
categories:any;
candidates:any;
artikels:any
activeTab: string = 'all';
currentCategories: any[] = [];
p: number = 1;

  constructor(private homeService:HomePageService) { }

  ngOnInit(): void {
    this.homeService.getInfoHomepage().subscribe((data:any)=>{
      this.categories=data.categories
      this.candidates=data.candidates
      console.log( this.candidates.length);
      
      this.artikels=data.artikels
    })
  }

}
