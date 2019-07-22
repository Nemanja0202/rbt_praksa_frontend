import { Component, OnInit } from '@angular/core';
import { Weather } from './weather.model';
import { WeatherService } from './weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {

  weather: Weather;
  interval: any;

  constructor(private weatherService: WeatherService) { }

  getWeatherData(): void {
    this.weatherService.getWeatherData().subscribe(
      weather => {
        this.weather = weather;
      }, 
      () => console.error('Error'));
  }

  ngOnInit() {
    this.getWeatherData();
    this.interval = setInterval(() => {
      this.getWeatherData();
    }, 30000);
  }
}
