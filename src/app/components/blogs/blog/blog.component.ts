import { Component, OnInit } from '@angular/core';
import { HomePageService } from 'src/app/services/home-page.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  artikels:any
  constructor(private homeService:HomePageService) { }

  ngOnInit(): void {
    this.homeService.getInfoHomepage().subscribe((data:any)=>{
      this.artikels=data.artikels
      this.artikels.forEach((article:any) => {
        article.title =   article.title.replace(/<[^>]*>/g, '').replace(/[^\w\s]/gi, '');
        article.short_description = article.short_description.replace(/<[^>]*>/g, '').replace(/[^\w\s]/gi, '');  
      });
          
    })
  }

}
