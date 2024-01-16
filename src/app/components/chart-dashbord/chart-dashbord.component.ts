import { Component, OnInit,ViewChild } from '@angular/core';
import { Chart } from 'chart.js';


@Component({
  selector: 'app-chart-dashbord',
  templateUrl: './chart-dashbord.component.html',
  styleUrls: ['./chart-dashbord.component.css']
})
export class ChartDashbordComponent implements OnInit {

  

  ngOnInit(): void {
  }
  constructor() { 

  }
  canevas:any
  ctx:any
  @ViewChild("myChart") myChart:any
  ngAfterViewInit(){
    this.canevas=this.myChart.nativeElement
    this.ctx=this.canevas.getContext('2d')
    new Chart(this.ctx,{
      type: 'line',
      data: {
        datasets: [
          {
            label: 'Acquisitions by year',
            data: [10,20,10,20,10,20],
            fill:false,
            backgroundColor:'rgb(75,192,192)',
            tension:0.1
          }
        ]
      }
})
  }

}
