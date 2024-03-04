import { Component, OnInit } from '@angular/core';
import { HomePageService } from 'src/app/services/home-page.service';

@Component({
  selector: 'app-list-candidates',
  templateUrl: './list-candidates.component.html',
  styleUrls: ['./list-candidates.component.css']
})
export class ListCandidatesComponent implements OnInit {
  categoriesTab:any
  topics:any
  sub:any
  candidates:any;
  activeTab: string = 'all';
  currentCategories: any[] = [];
  p: number = 1;
  searchCountry: string = ''; // Variable pour stocker la valeur de recherche
  searchLocation:string ='';

  constructor(private homeService:HomePageService) { }

  ngOnInit(): void {
    this.homeService.getInfoHomepage().subscribe((data:any)=>{
      this.candidates=data.candidates      
    })
  }
  get filteredJobs() {
    if (this.searchCountry.trim() !== '' || this.searchLocation.trim() !== '') {
      return this.candidates.filter((job:any) => {
        const titleMatch = this.searchCountry.trim() === '' || job.country.toLowerCase().includes(this.searchCountry.toLowerCase());
        return titleMatch ;
      });
    } else {
      return this.candidates;
    }
  }

}
