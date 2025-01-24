import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-investor-landing-page',
  templateUrl: './investor-landing-page.component.html',
  styleUrls: ['./investor-landing-page.component.css']
})
export class InvestorLandingPageComponent implements OnInit {

  scrollToSection() {
    const targetSection = document.getElementById('target-section');
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  constructor() { }

  ngOnInit(): void {
  }

}
