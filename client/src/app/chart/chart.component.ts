import { Component, OnInit } from '@angular/core';
import { Service } from '../services/service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../services/auth.service';
import { Chart, registerables } from 'node_modules/chart.js'
Chart.register(...registerables);

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})

export class ChartComponent implements OnInit {

  count!: any;

  constructor(private service: Service, private auth:AuthService, private router: Router, private spinner: NgxSpinnerService) { }
  
  ngOnInit() {
    this.getCounts();
  }  

  getCounts() {
    this.spinner.show();

    this.service.GetCount().subscribe({next : res => {
      if (res)
        this.spinner.hide();
      // console.log("count", res?.count)
      this.count = res?.count;
      
      this.RenderChart();
    }, error : err => {
      if (err instanceof HttpErrorResponse) {
        if ( err.status === 401 ) {
          this.auth.logout();
          this.router.navigate(['/']);
        }
      }
    }});
  }

  RenderChart() {
    const myChart = new Chart("dochart", {
      type: "doughnut",
      data: {
        labels: ["Acceptée", "En Attente", "Rejetée"],
        datasets: [{
          data: [this.count?.accepted, this.count?.inProgress, this.count?.rejected],
          backgroundColor: ["#41B883", "#ffa500", "#DD1B16"], // FFCE56 for yellow
          borderWidth: 2
        }]
      }
    });
  
  }

}
