import { Component, OnInit } from '@angular/core';
import { bool } from 'aws-sdk/clients/signer';

@Component({
  selector: 'app-skeleton-passport-candidate',
  templateUrl: './skeleton-passport-candidate.component.html',
  styleUrls: ['./skeleton-passport-candidate.component.css']
})
export class SkeletonPassportCandidateComponent implements OnInit {
  ongletSelectionne: any ;
  showAllBadges: boolean = false;
  showAllCertificates:boolean =false
  showAllSkills:boolean =false
  constructor() { }

  ngOnInit(): void {
    this.ongletSelectionne = "All";
  }

  selectionnerOnglet(onglet: string): void {
    this.ongletSelectionne = onglet;    
  }
}
