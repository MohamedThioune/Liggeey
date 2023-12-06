import { Component, OnInit,Input } from '@angular/core';
import { HomePageService } from 'src/app/services/home-page.service';

@Component({
  selector: 'app-category-emploi',
  templateUrl: './category-emploi.component.html',
  styleUrls: ['./category-emploi.component.css']
})
export class CategoryEmploiComponent implements OnInit {
  currentCategories:any
  
  p: number = 1;

  @Input() category: any;

  constructor(private homeService:HomePageService) { }

  ngOnInit(): void {
   
    
  }


}
