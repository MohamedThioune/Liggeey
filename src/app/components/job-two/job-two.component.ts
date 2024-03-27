import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-job-two',
  templateUrl: './job-two.component.html',
  styleUrls: ['./job-two.component.css']
})
export class JobTwoComponent implements OnInit {
  currentColor: string = '#ECEDF2';

  changeColor() {
    this.currentColor = '#1AC4A2'; // Changez la couleur selon vos besoins
  }
  currentChangeColor() {
    this.currentColor = '#1AC4A2'; // Changez la couleur selon vos besoins
  }

  constructor() { }

  ngOnInit(): void {
  }

}
