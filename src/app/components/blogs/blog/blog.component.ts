import { Component, OnInit } from '@angular/core';
import { HomePageService } from 'src/app/services/home-page.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  artikels:any;
  categories:any;
  constructor(private homeService:HomePageService) { }
  skillsTabs:any=[   

    {
      "term_id": 288,
      "name": "Chocolatier",
      "slug": "chocolatier",
      "term_group": 0,
      "term_taxonomy_id": 288,
      "taxonomy": "course_category",
      "description": "",
      "parent": 119,
      "count": 2,
      "filter": "raw",
      "cat_ID": 288,
      "category_count": 0,
      "category_description": "chocolatier",
      "cat_name": "Chocolatier",
      "category_nicename": "chocolatier"
    },
    {
      "term_id": 285,
      "name": "Ober",
      "slug": "ober",
      "term_group": 0,
      "term_taxonomy_id": 285,
      "taxonomy": "course_category",
      "description": "",
      "parent": 119,
      "count": 2,
      "filter": "raw",
      "cat_ID": 285,
      "category_count": 0,
      "category_description": "ober",
      "cat_name": "Ober",
      "category_nicename": "ober"
      
    },
    {
      "term_id": 290,
      "name": "Bartender",
      "slug": "bartender",
      "term_group": 0,
      "term_taxonomy_id": 290,
      "taxonomy": "course_category",
      "description": "",
      "parent": 119,
      "count": 3,
      "filter": "raw",
      "cat_ID": 290,
      "category_count": 0,
      "category_description": "bartender",
      "cat_name": "Bartender",
      "category_nicename": "bartender"
    },
    {
      "term_id": 269,
      "name": "Vuilnisman",
      "slug": "vuilnisman",
      "term_group": 0,
      "term_taxonomy_id": 269,
      "taxonomy": "course_category",
      "description": "",
      "parent": 113,
      "count": 1,
      "filter": "raw",
      "cat_ID": 269,
      "category_count": 0,
      "category_description": "vuilnisman",
      "cat_name": "Vuilnisman",
      "category_nicename": "vuilnisman"
    },
    {
      "term_id": 290,
      "name": "Bartender",
      "slug": "bartender",
      "term_group": 0,
      "term_taxonomy_id": 290,
      "taxonomy": "course_category",
      "description": "",
      "parent": 119,
      "count": 3,
      "filter": "raw",
      "cat_ID": 290,
      "category_count": 0,
      "category_description": "bartender",
      "cat_name": "Bartender",
      "category_nicename": "bartender"
    },
    {
      "term_id": 286,
      "name": "Traiteur",
      "slug": "traiteur",
      "term_group": 0,
      "term_taxonomy_id": 286,
      "taxonomy": "course_category",
      "description": "",
      "parent": 119,
      "count": 1,
      "filter": "raw",
      "cat_ID": 286,
      "category_count": 0,
      "category_description": "traiteur",
      "cat_name": "Traiteur",
      "category_nicename": "traiteur"
    }
    ]
  ngOnInit(): void {
    this.homeService.getInfoHomepage().subscribe((data:any)=>{
      this.artikels=data.artikels
      this.categories=data.categories      
      this.artikels.forEach((article:any) => {
        article.title =   article.title.replace(/<[^>]*>/g, '').replace(/[^\w\s]/gi, '');
        article.short_description = article.short_description.replace(/<[^>]*>/g, '').replace(/[^\w\s]/gi, '');  
      });
          
    })
  }


}
