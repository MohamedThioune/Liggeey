import { Component, Input, OnInit } from '@angular/core';
import { HomePageService } from 'src/app/services/home-page.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  categoriesTab:any
  topics:any
  sub:any
categories:any;
candidates:any;
artikels:any
activeTab: string = 'all';
currentCategories: any[] = [];
  constructor(private homeService:HomePageService) { }

  ngOnInit(): void {
    this.homeService.getInfoHomepage().subscribe((data:any)=>{
      this.categories=data.categories
      this.candidates=data.candidates
      this.artikels=data.artikels  
      console.log(this.artikels,this.artikels.length);
          
    })
    this.homeService.getCategories().subscribe((data:any)=>{
      this.categoriesTab=data.categories;
      this.topics=data.topics;
      this.sub=data.sub

      this.currentCategories=this.categories
      console.log(this.categoriesTab,this.topics,this.sub);
      
    })
  }
  
  changeTab(tab: string): void {
    this.activeTab = tab;

    if (tab === 'all') {
      this.currentCategories = this.categoriesTab;      
    } else if (tab === 'mainCategories') {
      this.currentCategories = this.categoriesTab;
    } else if (tab === 'topics') {
      this.currentCategories = this.topics;
    } else if (tab === 'sub') {
      this.currentCategories = this.sub;
    }
  }

}
