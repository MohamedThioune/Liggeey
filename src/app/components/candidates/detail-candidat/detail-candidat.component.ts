import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HomePageService } from 'src/app/services/home-page.service';

@Component({
  selector: 'app-detail-candidat',
  templateUrl: './detail-candidat.component.html',
  styleUrls: ['./detail-candidat.component.css']
})
export class DetailCandidatComponent implements OnInit {
  identifiant:number | null = 0;
  candidat:any

  constructor(private route : ActivatedRoute ,private HomePageService: HomePageService) { }
  ngOnInit(): void {

    this.identifiant = +this.route.snapshot.params['id'];    
    this.HomePageService.getDetailCandidate( this.identifiant).subscribe(data=>{
      this.candidat=data      
    })
    
  }

}
