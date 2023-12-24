import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface Location {
  location: string;
  latitude: number;
  longitude: number;
  count: number;
}

@Injectable({
  providedIn: 'root'
})
export class LocationService{
  loc: Location[]=[]
  locUpdated: Subject<Location[]> = new Subject<Location[]>();

  constructor(private http: HttpClient) {
    this.loc = [
      {
        location: 'Metrotown',
        latitude: 49.2276,
        longitude: -123.0076,
        count: 0
      },
      {
        location: 'SFU Burnaby',
        latitude: 49.2781,
        longitude: -122.9199,
        count: 0
      },
      {
        location: 'YVR Airport',
        latitude: 49.1922,
        longitude: -123.1828,
        count: 0
      }
    ]
  }

  get():Location[] {
    return this.loc
  }

  add(newLoc:Location){
    const existingLocation = this.loc.find(loc => loc.location === newLoc.location);
    if (existingLocation) {
      existingLocation.count++;
    } else {
      this.loc.push({ ...newLoc, count: 0 });
    }
  }

  delete(delLoc:any){
    const existingLocation = this.loc.find(loc => loc.location === delLoc.location);
    if (existingLocation) {
      existingLocation.count--;
    }
    this.loc = this.loc.filter((l) => l.location != delLoc)
    return this.loc
  }

  getCount(location: string): number {
    const loc = this.loc.find(l => l.location === location);
    return loc ? loc.count : 0;
  }

  addCount(location: string) {
    const locIndex = this.loc.findIndex(l => l.location === location);
    if (locIndex !== -1) {
      this.loc[locIndex].count = (this.loc[locIndex].count || 0) + 1;
      this.locUpdated.next(this.loc);
    }
  }

}
