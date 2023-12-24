import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { LocationService } from '../location.service';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  private map!: L.Map

  constructor(private ls: LocationService){}

  ngOnInit(): void {
    this.showMap()
    setTimeout(() => {
      this.putLabels();
    }, 100);
  }

  showMap() {
    this.map = L.map('mapid').setView([49.25, -123], 11);

    const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> ',

    }).addTo(this.map);
  }

  putLabels() {
    const locations = this.ls.get();
  
    locations.forEach((location:any) => {
      const usageCount = this.ls.getCount(location.location);
  
      if (usageCount > 0) {
        L.marker([location.latitude, location.longitude])
          .addTo(this.map)
          .bindPopup(`<b>${location.location}</b><br />${usageCount} nuisance reports`);
      }
    });
  }  
}
