import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HomePageService } from 'src/app/services/home-page.service';
import { UsagerService } from 'src/app/services/usager.service';

@Component({
  selector: 'app-job-one',
  templateUrl: './job-one.component.html',
  styleUrls: ['./job-one.component.css']
})
export class JobOneComponent implements OnInit {
  someArrayOfThings!:any
  currentColor: string = '#ECEDF2';
  isClass1Visible = true;
  jobs:any;
  job:any;
  p: number = 1;
  searchTitle: string = ''; // Variable pour stocker la valeur de recherche
  searchLocation:string ='';
  date:any;
  loading:boolean=true;
  currentDate!: Date;
  sentDate: any;
  identifiant:number | null = 0;
  userConnect:any;
  appliedJob=false
  candidate=false
  company=false
  selectedSkillsText: string = '';
  selectedSkills: string[] = [];
  showDropdownSkills: boolean = false
  skills: any[] = ['Google','English','Google Workspace', 'Microsoft', 'Account management', 'Accounting', 'Acquiring', 'Administration', 'Administration and Reporting',];

  constructor(private homeService:HomePageService,private datePipe: DatePipe,private usagerService: UsagerService,private route : ActivatedRoute ,private router: Router) {}
  ngOnInit(): void {
        // Récupération du token depuis le local storage
        const storedToken = this.usagerService.getToken();
        this.identifiant = +this.route.snapshot.params['id'];

        if (storedToken) {
                    // Décodage de la base64
          const decodedToken = atob(storedToken);

          // Parse du JSON pour obtenir l'objet original
          this. userConnect = JSON.parse(decodedToken);
          if(this.userConnect.acf.is_liggeey == "candidate"){
            this.candidate=true

          } else if(this.userConnect.acf.is_liggeey == "chief"){
            this.company=true
            }
        }
        this.homeService.getInfoHomepage().subscribe((data:any)=>{
          this.skills=data.categories          
      })
    this.currentDate = new Date();
    this.sentDate = this.datePipe.transform(this.currentDate, 'yyyy-MM-dd');
    this.homeService.getAllJob().subscribe((data:any)=>{
      this.jobs=data
      this.loading=false
      //this.jobLoaded=true
      this.jobs.forEach((element:any) => {
        element.description= element.description.replace(/<[^>]*>/g, '').replace(/[^\w\s]/gi, '')
      });
    })
  }
  get filteredJobs() {
    if (this.searchTitle.trim() !== '' || this.searchLocation.trim() !== '' || this.selectedSkillsText.trim() !== '') {
      return this.jobs.filter((job:any) => {
        const titleMatch = this.searchTitle.trim() === '' || job.title.toLowerCase().includes(this.searchTitle.toLowerCase());
        const placeMatch = this.searchLocation.trim() === '' || job.country.toLowerCase().includes(this.searchLocation.toLowerCase());
        const jobSkills = Array.isArray(job.skills) ? job.skills : [];
        const skills = this.selectedSkillsText.trim() === '' || jobSkills.some((skill: any) =>
          skill.name.toLowerCase().includes(this.selectedSkillsText.toLowerCase())
        );

        return titleMatch && placeMatch && skills;
      });
    } else {
      return this.jobs;
    }
    
  }
  openApplyModal(jobId: string,jobSlug :string) {
    this.homeService.setSelectedJobId(jobId,jobSlug);
    const modalElement = document.getElementById('modal-apply');
    if (modalElement) {
      modalElement.click();
    } else {
      console.error("Modal element not found");
    }
  }
  canAppl(item: any): boolean {
    if (!this.userConnect || !this.userConnect.id) {
      return true; // Si l'utilisateur n'est pas connecté, autoriser l'application
  }

  if (item && item.applied) {
    return !item.applied.some((appliedItem: any) => appliedItem.ID === this.userConnect.id);
  }

  return true;
  }
  changeColor() {
    this.currentColor = '#1AC4A2'; // Changez la couleur selon vos besoins
  }
  currentChangeColor() {
    this.currentColor = '#1AC4A2'; // Changez la couleur selon vos besoins
  }

  toggleClass() {
    this.isClass1Visible = !this.isClass1Visible;
  }
  toggleDropdownSkills() {
    this.showDropdownSkills = !this.showDropdownSkills;
  }

  onSkillChange(skill: string, event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.selectedSkills.push(skill);
    } else {
      this.selectedSkills = this.selectedSkills.filter(s => s !== skill);
    }
    this.updateSelectedSkillsText();
  }

  isSelected(skill: string): boolean {
    return this.selectedSkills.includes(skill);
  }

  updateSelectedSkillsText() {
    this.selectedSkillsText = this.selectedSkills.join(', ');
  }

}
