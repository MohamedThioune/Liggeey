import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  selectedGender: string = '';
  constructor(private homeService:HomePageService, private router: Router) { }

  ngOnInit(): void {
    this.homeService.getCandidates().subscribe((data:any)=>{
      console.log(data);
      
      this.candidates=data.candidates
    })
    
  }

  send_id(id: any) {
    this.homeService.setCandidatId(id);
    localStorage.setItem('candidatId', id); // Stocker l'ID dans le localStorage
    this.router.navigate(['/detail-candidat'])
      .then(() => {
        window.location.reload();
      });
  }
  get filteredCandidate() {
    if (this.searchCountry.trim() !== '' || this.searchName.trim() !== '' || this.searchCategori.trim() !== '') {
      return this.candidates.filter((candidat: any) => {
        const locationMatch = this.searchCountry.trim() === '' || candidat.country.toLowerCase().includes(this.searchCountry.toLowerCase());
        const nameMatch = this.searchName.trim() === '' || candidat.first_name.toLowerCase().includes(this.searchName.toLowerCase());
        const categoriMatch = this.searchCategori.trim() === '' || candidat.skills.some((skill: any) => skill.name.toLowerCase().includes(this.searchCategori.toLowerCase()));
        return locationMatch && nameMatch && categoriMatch;
      });
    } else {
      return this.candidates;
    }
  }

  filterCandidatesByGender(event: any): void {
    const selectedGender = event.target?.value; // Utilisation de l'opérateur de navigation sécurisée (?.) pour éviter l'erreur si event.target est null
    //console.log(selectedGender);

    if (selectedGender === '') {
      // Si aucune option n'est sélectionnée, afficher tous les candidats
      this.filteredCandidates = this.candidates;
    } else if(selectedGender) {
      // Filtrer les candidats en fonction du genre sélectionné
      this.filteredCandidates = this.candidates.filter((candidate: any) => candidate.gender === selectedGender);
      //console.log(this.filteredCandidates);

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
