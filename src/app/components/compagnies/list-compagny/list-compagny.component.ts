import { Component, OnInit } from '@angular/core';
import { HomePageService } from 'src/app/services/home-page.service';

@Component({
  selector: 'app-list-compagny',
  templateUrl: './list-compagny.component.html',
  styleUrls: ['./list-compagny.component.css']
})
export class ListCompagnyComponent implements OnInit {
  categoriesTab:any
  topics:any
  sub:any
  employers:any;
  activeTab: string = 'all';
  currentCategories: any[] = [];
  p: number = 1;
  constructor(private homeService:HomePageService) { }

  ngOnInit(): void {
    this.homeService.getAllCompagny().subscribe((data:any)=>{
      this.employers=data  
    })
  }

}
