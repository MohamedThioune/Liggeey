import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HomePageService } from 'src/app/services/home-page.service';

@Component({
  selector: 'app-detail-job',
  templateUrl: './detail-job.component.html',
  styleUrls: ['./detail-job.component.css']
})
export class DetailJobComponent implements OnInit {
  identifiant:number | null = 0;
  job:any;
  constructor(private route : ActivatedRoute ,private HomePageService: HomePageService) { }

  ngOnInit(): void {
    this.identifiant = +this.route.snapshot.params['id'];
    this.HomePageService.getDetailCompagny( this.identifiant).subscribe(data=>{
      this.job = data 
      console.log(this.job.description);
                 
    })
  }


}
