import { Component, OnInit } from '@angular/core';
import { HomePageService } from 'src/app/services/home-page.service';
import { FormBuilder } from '@angular/forms';
import { UsagerService } from 'src/app/services/usager.service';
import { ActivatedRoute, Router } from '@angular/router';


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
  favorites:any;


  constructor(private route : ActivatedRoute ,private HomePageService: HomePageService,private fb: FormBuilder,private router: Router , private homeService:HomePageService,private usagerService: UsagerService) { }

  ngOnInit(): void {
    this.identifiant = +this.route.snapshot.params['id'];    
    this.HomePageService.getAlertCandidat( this.identifiant).subscribe(data=>{
      this.favorites=data      
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
