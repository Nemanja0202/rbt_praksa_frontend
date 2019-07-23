import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WeatherComponent } from './weather/weather.component';
import { WeatherTableComponent } from './weather/weather-table/weather-table.component';

const routes: Routes = [
  {
  path:'', component: WeatherComponent, children: [{path: "weather-table", component: WeatherTableComponent}]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
