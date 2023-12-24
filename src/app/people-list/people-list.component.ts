import { Component, OnInit } from '@angular/core';
import { PeopleService } from '../people.service';
import { LocationService } from '../location.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import * as Model from '../people.service'
import Person = Model.Person

@Component({
  selector: 'app-people-list',
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.css']
})
export class PeopleListComponent implements OnInit{
  people: Person[] = []
  private updateSubscription: Subscription;

  constructor(private ps:PeopleService, private ls:LocationService, private router: Router){
    this.people = []
    this.updateSubscription = new Subscription();
  }

  onPersonDelete(evt:any) {
    let delete_person = evt['delete_person']
    this.ps.delete(delete_person).subscribe(() => {
        this.people = this.people.filter(person => person.key !== delete_person);
      }
    );
  }

  sortByLocation() {
    this.people = this.sortArray([...this.people], ['data.location', 'data.name']);
  }
  
  sortByName() {
    this.people = this.sortArray([...this.people], ['data.name', 'data.location']);
  }
  
  sortByAddedOn() {
    this.people = this.sortArray([...this.people], ['data.added_on', 'data.location', 'data.name']);
  }

  sortByStatus() {
    this.people = this.sortArray([...this.people], ['data.status', 'data.location', 'data.name']);
  }
  
  private sortArray(array: any[], fields: string[]): Person[] {
    return array.sort((a, b) => {
      for (const field of fields) {
        const valueA = this.getPropertyValue(a, field);
        const valueB = this.getPropertyValue(b, field);
        if (valueA > valueB) {
          return 1;
        } else if (valueA < valueB) {
          return -1;
        }
      }
      return 0;
    });
  }
  
  private getPropertyValue(obj: any, propertyPath: string): any {
    const properties = propertyPath.split('.');
    let value = obj;
  
    for (const prop of properties) {
      if (value && value.hasOwnProperty(prop)) {
        value = value[prop];
      } else {
        return null;
      }
    }
  
    return value;
  }
  
  ngOnInit(): void {
    this.ps.get().subscribe(
      (data: Person[]) => {
        this.people = data;
      }
    );

    this.updateSubscription = this.ps.updateEvent.subscribe(() => {
      setTimeout(() => {
        window.location.reload()
      }, 100);
      window.location.reload()
      this.ps.get().subscribe(
        (data: any[]) => {
          this.people = data;
        },
        (error) => {
          console.error('Error fetching data:', error);
        }
      );
    });
  }
}
