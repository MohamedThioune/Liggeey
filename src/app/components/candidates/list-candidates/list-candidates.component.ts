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
  searchName:string='';
  searchCategori:string='';
  tabGender=["Male","Femelle"];
  tabExperience=[0-5,5-10];
  tabLevel=["Bac","Licence","Master"];
  filteredCandidates!:any
  constructor(private homeService:HomePageService) { }

  ngOnInit(): void {
    this.homeService.getInfoHomepage().subscribe((data:any)=>{
      this.candidates=data.candidates      
    })
  }
  get filteredJobs() {
    if (this.searchCountry.trim() !== '' || this.searchName.trim() !== '' || this.searchCategori.trim() !== '' ) {
      return this.candidates.filter((job:any) => {
        const locationMatch = this.searchCountry.trim() === '' || job.country.toLowerCase().includes(this.searchCountry.toLowerCase());
        const nameMatch = this.searchName.trim() === '' || job.first_name.toLowerCase().includes(this.searchName.toLowerCase());
        const categoriMatch = this.searchCategori.trim() === '' || job.work_as.toLowerCase().includes(this.searchCategori.toLowerCase());
        return locationMatch && nameMatch && categoriMatch;
      });
    } else {
      return this.candidates;
    }
  }
  filterCandidatesByGender(event: Event): void {
    const selectedGender = (event.target as HTMLSelectElement).value;
    if (selectedGender === '') {
      // Si aucune option n'est sélectionnée, afficher tous les candidats
      this.filteredCandidates = this.candidates;
    } else {
      // Filtrer les candidats en fonction du genre sélectionné
      this.filteredCandidates = this.candidates.filter((candidate:any) => candidate.gender === selectedGender);
    }
  }
  filterCandidatesByExperience(event: Event): void {
    const selectedExperience = (event.target as HTMLSelectElement).value;
    if (selectedExperience === '') {
      // Si aucune option n'est sélectionnée, afficher tous les candidats
      this.filteredCandidates = this.candidates;
    } else {
      // Filtrer les candidats en fonction du genre sélectionné
      this.filteredCandidates = this.candidates.filter((candidate:any) => candidate.experience === selectedExperience);
    }
  }
  filterCandidatesByLevel(event: Event): void {
    const selectedLevel= (event.target as HTMLSelectElement).value;
    if (selectedLevel === '') {
      // Si aucune option n'est sélectionnée, afficher tous les candidats
      this.filteredCandidates = this.candidates;
    } else {
      // Filtrer les candidats en fonction du genre sélectionné
      this.filteredCandidates = this.candidates.filter((candidate:any) => candidate.level === selectedLevel);
    }
  }

}
