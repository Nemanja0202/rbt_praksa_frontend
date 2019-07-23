import { Component, OnInit } from '@angular/core';
import { Weather } from './weather.model';
import { WeatherService } from './weather.service';
import { Router, ActivatedRoute } from '@angular/router'
import { Chart } from 'chart.js';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {

  showComp2: boolean = false;
  chart: any = [];
  weather: Weather;
  interval: any;
  humidity: any = [];
  pollution: any = [];
  temperature: any = [];
  timestamps: any = [];
  initiated = false;

  constructor(private weatherService: WeatherService,
              private router: Router,
              private route: ActivatedRoute) { }

  getWeatherData(): void {
    this.weatherService.getWeatherData().subscribe(
      weather => {
        this.weather = weather;
        this.humidity.push(this.weather.humidity);
        this.temperature.push(this.weather.temperature);
        this.pollution.push(this.weather.pollution);
        this.timestamps.push(new Date(this.weather.timestamp).toLocaleTimeString());
        if (!this.initiated) {
          this.setChart();
          this.initiated = true;
        }
        this.chart.update();
      }, 
      () => console.error('Error'));
  }

  setChart() {
    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels:  this.timestamps,
        datasets: [
          {
            label: 'iaq',
            data: this.pollution,
            borderColor: '#3cba9f',
            backgroundColor: '#3cba9f',
            fill: false,
            padding: 10
          }
        ]
      },
      options: {
        title: {
          display: true,
          text: 'Air pollution chart',
          position: 'right',
          fontSize: 14,
          fontColor: '#fff'
        },
        layout: {
          padding: {
              left: 50,
              right: 50,
              top: 50,
              bottom: 50
          }
        },
        tooltips: {
          mode: 'point'
        },
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            display: true,
            gridLines: {
              display: true ,
              color: "#FFFFFF"
            },
            ticks: {
              fontColor: "#fff",
              autoSkip: true,
              maxTicksLimit: 5
            },
          }],
          yAxes: [{
            display: true,
            gridLines: {
              display: true ,
              color: "#FFFFFF",
            },
            ticks: {
              fontColor: "#fff"
            }
          }],
        },
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }

  showChildComp() {
    this.showComp2 = true;
    this.router.navigate(['/weather-table'], {relativeTo:this.route});
  }

  ngOnInit() {
    this.getWeatherData();
    this.interval = setInterval(() => {
      this.getWeatherData();
    }, 3000);
  }
}
