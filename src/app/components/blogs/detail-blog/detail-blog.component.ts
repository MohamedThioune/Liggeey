import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HomePageService } from 'src/app/services/home-page.service';
@Component({
  selector: 'app-detail-blog',
  templateUrl: './detail-blog.component.html',
  styleUrls: ['./detail-blog.component.css']
})
export class DetailBlogComponent implements OnInit {
  identifiant:number | null = 0;
  article:any
  constructor(private route : ActivatedRoute ,private HomePageService: HomePageService) { }

  ngOnInit(): void {
    this.identifiant = +this.route.snapshot.params['id'];  
      
    this.HomePageService.getDetailArticle( this.identifiant).subscribe(data=>{
      this.article=data            
    })
  }

}
