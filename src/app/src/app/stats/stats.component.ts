import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  ArcElement,
  BarController,
  BarElement,
  CategoryScale,
  Chart,
  Decimation,
  DoughnutController,
  Filler,
  Legend,
  LinearScale,
  LineController,
  LineElement,
  LogarithmicScale,
  PieController,
  PolarAreaController,
  RadarController,
  RadialLinearScale,
  ScatterController,
  SubTitle, TimeScale,
  TimeSeriesScale, Title,
  Tooltip
} from 'chart.js';
import { Category } from '../models/Category';
import { BackendService } from '../services/backend.service';
interface CategoryStat {
  name: string;
  // eslint-disable-next-line id-blacklist
  number: number;
}

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss'],
})
export class StatsComponent implements OnInit, AfterViewInit {

  @ViewChild('barCanvas') private barCanvas: ElementRef;
  @ViewChild('doughnutCanvas') private doughnutCanvas: ElementRef;
  @ViewChild('lineCanvas') private lineCanvas: ElementRef;
  barChart: any;
  doughnutChart: any;
  lineChart: any;
  categoriesStats: CategoryStat[] = [];
  category = 1;
  categories: Category[] = [];
  regions = {
    adamawa: 'heat-3',
    est: 'heat-6',
    centre: 'heat-2',
    littoral: 'heat-4',
    nord: 'heat-8',
    'extreme-nord': 'heat-9',
    ouest: 'heat-7',
    'nord-ouest': 'heat-8',
    'sud-ouest': 'heat-6',
    sud: 'heat-3',
  };

  constructor(private http: HttpClient, private backend: BackendService) {
    Chart.register(
      ArcElement,
      LineElement,
      BarElement,
      //   PointElement,
      BarController,
      //   BubbleController,
      DoughnutController,
      LineController,
      PieController,
      PolarAreaController,
      RadarController,
      ScatterController,
      CategoryScale,
      LinearScale,
      LogarithmicScale,
      RadialLinearScale,
      TimeScale,
      TimeSeriesScale,
      Decimation,
      Filler,
      Legend,
      Title,
      Tooltip,
      SubTitle
    );
  }

  ngOnInit() {
    this.backend.categories.all().subscribe(categories => this.categories = categories);
  }

  ngAfterViewInit() {
    this.http.get<CategoryStat[]>('analyse/').subscribe(
      res => {
        this.categoriesStats = res;
        this.barChartMethod();
        this.doughnutChartMethod();
        this.plotCategoryDetails();
      }
    );
    // this.lineChartMethod();
  }

  barChartMethod() {

    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: this.categoriesStats.map(cat => cat.name.substring(0, cat.name.length < 10 ? cat.name.length : 10)),
        datasets: [{
          label: '% Occupation',
          data: this.categoriesStats.map(cat => cat.number),
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 159, 0, 0.2)',
            'rgba(155, 59, 164, 0.2)',
            'rgba(5, 219, 94, 0.2)',
            'rgba(50, 29, 4, 0.2)',
            'rgba(5, 19, 255, 0.2)',
            'rgba(50, 10, 20, 0.2)',
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255, 159, 0, 1)',
            'rgba(155, 59, 164, 1)',
            'rgba(5, 219, 94, 1)',
            'rgba(50, 29, 4, 1)',
            'rgba(5, 19, 255, 1)',
            'rgba(50, 10, 20, 1)',
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        } as any
      }
    });
  }

  doughnutChartMethod() {
    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
      type: 'pie',
      data: {
        labels: this.categoriesStats.map(cat => cat.name.substring(0, cat.name.length < 10 ? cat.name.length : 10)),
        datasets: [{
          label: '# of Votes',
          data: this.categoriesStats.map(cat => cat.number),
          backgroundColor: [
            'rgba(255, 99, 132, 0.8)',
            'rgba(54, 162, 235, 0.8)',
            'rgba(255, 206, 86, 0.8)',
            'rgba(75, 192, 192, 0.8)',
            'rgba(153, 102, 255, 0.8)',
            'rgba(255, 159, 64, 0.8)',
            'rgba(255, 159, 0, 0.8)',
            'rgba(155, 59, 164, 0.8)',
            'rgba(5, 219, 94, 0.8)',
            'rgba(50, 29, 4, 0.8)',
            'rgba(5, 19, 255, 0.8)',
            'rgba(50, 10, 20, 0.8)',
          ],
          hoverBackgroundColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255, 159, 0, 1)',
            'rgba(155, 59, 164, 1)',
            'rgba(5, 219, 94, 1)',
            'rgba(50, 29, 4, 1)',
            'rgba(5, 19, 255, 1)',
            'rgba(50, 10, 20, 1)',
          ]
        }]
      }
    });
  }


  lineChartMethod() { }
  plotCategoryDetails() {
    this.http.post<CategoryStat[]>('analyse/', {
      category: this.category
    }).subscribe();
  }

}
