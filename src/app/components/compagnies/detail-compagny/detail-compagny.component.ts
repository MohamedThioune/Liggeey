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
  constructor(private route : ActivatedRoute ,private HomePageService: HomePageService) { }

  ngOnInit(): void {
    this.identifiant = +this.route.snapshot.params['id'];    
    this.HomePageService.getDetailCompagny( this.identifiant).subscribe(data=>{
      this.employer=data            
    })
  }

}
