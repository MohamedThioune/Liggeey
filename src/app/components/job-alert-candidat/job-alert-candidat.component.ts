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
  notifications:any;


  constructor(private route : ActivatedRoute ,private HomePageService: HomePageService,private fb: FormBuilder,private router: Router , private homeService:HomePageService,private usagerService: UsagerService) { }

  ngOnInit(): void {
    this.identifiant = +this.route.snapshot.params['id'];    
    this.HomePageService.getNotificationCandidat( this.identifiant).subscribe(data=>{
      //this.notifications = data.filter((notification:any) => notification.userApplyId === this.identifiant);
      this.notifications=data;
      console.log(this.notifications);
      
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
