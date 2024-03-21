import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HomePageService } from 'src/app/services/home-page.service';
import { UsagerService } from 'src/app/services/usager.service';

@Component({
  selector: 'app-job-favorite-candidat',
  templateUrl: './job-favorite-candidat.component.html',
  styleUrls: ['./job-favorite-candidat.component.css']
})
export class JobFavoriteCandidatComponent implements OnInit {
  p: number = 1;  someArrayOfThings!:any
  isSidebarVisible = false;
  showButton = true;
  identifiant:number | null = 0;
  favorites:any;

  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
    this.showButton = false;
  }
  fermerSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
    this.showButton = true;
  }

  constructor(private route : ActivatedRoute ,private HomePageService: HomePageService,private fb: FormBuilder,private router: Router , private homeService:HomePageService,private usagerService: UsagerService) { }

  ngOnInit(): void {
    this.identifiant = +this.route.snapshot.params['id'];    
    this.HomePageService.getAlertCandidat( this.identifiant).subscribe(data=>{
      this.favorites=data      
      console.log(data);
      
    })
  }

}
