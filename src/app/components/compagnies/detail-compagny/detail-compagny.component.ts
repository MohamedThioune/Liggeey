import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HomePageService } from 'src/app/services/home-page.service';

@Component({
  selector: 'app-detail-compagny',
  templateUrl: './detail-compagny.component.html',
  styleUrls: ['./detail-compagny.component.css']
})
export class DetailCompagnyComponent implements OnInit {
  identifiant:number | null = 0;
  employer:any
  loading:boolean=true;
  slug:any;
  constructor(private route : ActivatedRoute ,private HomePageService: HomePageService) { }

  ngOnInit(): void {
    this.slug = this.route.snapshot.params['post_slug'];        
    this.HomePageService.getDetailCompagny(this.slug).subscribe(data=>{
      this.employer=data;
      this.loading=false;                  
    })
  }

}
