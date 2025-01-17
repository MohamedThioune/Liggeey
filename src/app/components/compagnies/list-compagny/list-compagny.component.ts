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
  searchCountry: string = ''; 
  searchTitle: string = ''; 
  searchLocation:string ='';
  loading :boolean=true;

  constructor(private homeService:HomePageService) { }

  ngOnInit(): void {
    this.homeService.getAllCompagny().subscribe((data:any)=>{
      this.employers=data 
      console.log(this.employers)
      this.loading=false       
    })
  }

  get filteredJobs() {
    if (this.searchCountry.trim() !== '' || this.searchTitle.trim() === '') {
      return this.employers.filter((job:any) => {
        const titleMatch = this.searchCountry.trim() === '' || job.address.toLowerCase().includes(this.searchCountry.toLowerCase());
        const nametitle = this.searchTitle.trim() === '' || job.post_title.toLowerCase().includes(this.searchTitle.toLowerCase());
        return titleMatch && nametitle;
      });
    } else {
      return this.employers;
    }
  }

}
