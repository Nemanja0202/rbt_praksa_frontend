import { Component, OnInit } from '@angular/core';
import { Weather } from './weather.model';
import { WeatherService } from './weather.service';
import { Router, ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {

  showComp2: boolean = false;
  weather: Weather;
  interval: any;
  humidity: any = [];
  pollution: any = [];
  temperature: any = [];
  timestamps: any = [];

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
      }, 
      () => console.error('Error'));
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
