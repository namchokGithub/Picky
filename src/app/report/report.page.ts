import { Component, ViewChild , OnInit } from '@angular/core';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { GoogleChartInterface } from 'ng2-google-charts/google-charts-interfaces';

@Component({
  selector: 'app-report',
  templateUrl: './report.page.html',
  styleUrls: ['./report.page.scss'],
})
export class ReportPage implements OnInit {
  public columnChart1: GoogleChartInterface;
  public columnChart2: GoogleChartInterface;
  public barChart: GoogleChartInterface
  constructor() { }

  ngOnInit() {
  }
  ionViewDidEnter() {
    this.loadColumnChart();
    this.loadGroupColumnChart();
    this.loadBarChart();
  }

  loadColumnChart() {
    this.columnChart1 = {
      chartType: 'ColumnChart',
      dataTable: [
        ['City', '2010 Population'],
        ['New York City, NY', 8175000],
        ['Los Angeles, CA', 3792000],
        ['Chicago, IL', 2695000],
        ['Houston, TX', 2099000],
        ['Philadelphia, PA', 1526000]
      ],
      //opt_firstRowIsData: true,
      options: {
        title: 'Population of Largest U.S. Cities',
        height: 600,
        chartArea: { height: '400' },
        hAxis: {
          title: 'Total Population',
          minValue: 0
        },
        vAxis: {
          title: 'City'
        }
      },
    };
  }

  loadGroupColumnChart() {
    this.columnChart2 = {
      chartType: 'ColumnChart',
      dataTable: [
        ['City', '2010 Population', '2000 Population'],
        ['New York City, NY', 8175000, 8008000],
        ['Los Angeles, CA', 3792000, 3694000],
        ['Chicago, IL', 2695000, 2896000],
        ['Houston, TX', 2099000, 1953000],
        ['Philadelphia, PA', 1526000, 1517000]
      ],
      //opt_firstRowIsData: true,
      options: {
        title: 'Population of Largest U.S. Cities',
        height: 600,
        chartArea: { height: '400' },
        hAxis: {
          title: 'Total Population',
          minValue: 0
        },
        vAxis: {
          title: 'City'
        }
      },
    };
  }

  loadBarChart() {
    this.barChart = {
      chartType: 'BarChart',
      dataTable: [
        ['City', '2010 Population', '2000 Population'],
        ['New York City, NY', 8175000, 8008000],
        ['Los Angeles, CA', 3792000, 3694000],
        ['Chicago, IL', 2695000, 2896000],
        ['Houston, TX', 2099000, 1953000],
        ['Philadelphia, PA', 1526000, 1517000]
      ],
      //opt_firstRowIsData: true,
      options: {
        title: 'Population of Largest U.S. Cities',
        height: 400,
        chartArea: { height: '300' },
        hAxis: {
          title: 'Total Population',
          minValue: 0
        },
        vAxis: {
          title: 'City'
        }
      },
    }
  }
}
