import { Component, OnInit } from '@angular/core';
import { HomePageService } from 'src/app/services/home-page.service';

@Component({
  selector: 'app-list-compagny',
  templateUrl: './list-compagny.component.html',
  styleUrls: ['./list-compagny.component.css']
})
export class ListCompagnyComponent implements OnInit {
  categoriesTab:any
  topics:any
  sub:any
  employers:any;
  activeTab: string = 'all';
  currentCategories: any[] = [];
  p: number = 1;
  searchCountry: string = ''; // Variable pour stocker la valeur de recherche
  searchLocation:string ='';

  constructor(private homeService:HomePageService) { }

  ngOnInit(): void {
    this.homeService.getAllCompagny().subscribe((data:any)=>{
      this.employers=data  
    })
  }

  get filteredJobs() {
    if (this.searchCountry.trim() !== '') {
      return this.employers.filter((job:any) => {
        const titleMatch = this.searchCountry.trim() === '' || job.address.toLowerCase().includes(this.searchCountry.toLowerCase());
        return titleMatch ;
      });
    } else {
      return this.employers;
    }
  }

}
