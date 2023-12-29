import {AfterViewInit, ElementRef, ViewChild, Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ArrayType } from '@angular/compiler';


@Component({
  selector: 'app-map-home',
  templateUrl: './map-home.component.html',
  styleUrl: './map-home.component.css'
})
export class MapHomeComponent implements AfterViewInit{
  name = '';
  capital = '';
  region = '';
  lic = '';
  lat = '';
  lon = '';

  constructor(private http:HttpClient) {
  }

  requestCountryData = (id: string) => {
    const url = 'http://api.worldbank.org/v2/country/' + id + '?format=json';
    const req = this.http.get(url);
    req.subscribe( (data: any) => {
      const info = data[1][0];
      console.log(info);
      this.capital=info.capitalCity;
      this.name=info.name;
      this.region=info.region.value;
      this.lic=info.incomeLevel.value;
      this.lat = info.latitude;
      this.lon = info.longitude;
    });
  }

  ngAfterViewInit(): void {
    const map = document.getElementById('map');
    if (map) {
      const paths = map.children;
      for (var i = 0; i < paths.length; i++) {
        paths[i].addEventListener('click', (e) => {
          const country = e.target as HTMLElement;
          console.log(country.id);
          console.log(country.getAttribute('title'));
          this.requestCountryData(country.id);
        });
      }
    }
  }
}
