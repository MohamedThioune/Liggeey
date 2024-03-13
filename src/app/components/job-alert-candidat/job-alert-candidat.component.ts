import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HomePageService } from 'src/app/services/home-page.service';

@Component({
  selector: 'app-job-alert-candidat',
  templateUrl: './job-alert-candidat.component.html',
  styleUrls: ['./job-alert-candidat.component.css']
})
export class JobAlertCandidatComponent implements OnInit {
  p: number = 1;  someArrayOfThings!:any
  isSidebarVisible = false;
  showButton = true;
  identifiant:number | null = 0;
  candidat:any
  constructor(private route : ActivatedRoute ,private HomePageService: HomePageService) { }

  ngOnInit(): void {
    this.identifiant = +this.route.snapshot.params['id'];    
    this.HomePageService.getAlertCandidat( this.identifiant).subscribe(data=>{
      this.candidat=data      
      console.log(data);
      
    })
  }
  
  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
    this.showButton = false;
  }
  fermerSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
    this.showButton = true;
  }

}
