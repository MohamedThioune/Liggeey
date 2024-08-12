import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hire-candidat',
  templateUrl: './hire-candidat.component.html',
  styleUrls: ['./hire-candidat.component.css']
})
export class HireCandidatComponent implements OnInit {
  downloadLink!: string;

  constructor() { }

  ngOnInit(): void {
    this.setDownloadLink();

  }
  setDownloadLink() {
    const userAgent = window.navigator.userAgent.toLowerCase();
    if (userAgent.includes('safari') && !userAgent.includes('chrome')) {
      // Safari browser
      this.downloadLink = 'https://apps.apple.com/nl/app/livelearn/id1666976386';
    } else if (userAgent.includes('chrome')) {
      // Android browser
      this.downloadLink = 'https://play.google.com/store/apps/details?id=com.livelearn.livelearn_mobile_app&pli=1';
    } else {
      // Default link or other browsers
      this.downloadLink = 'https://play.google.com/store/apps/details?id=com.livelearn.livelearn_mobile_app&pli=1';
    }
  }
}
