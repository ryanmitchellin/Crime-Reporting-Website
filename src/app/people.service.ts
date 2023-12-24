import { Injectable } from '@angular/core';
import { LocationService } from './location.service';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { tap, map } from 'rxjs/operators';

export interface Person {
  key: string;
  data: {
    name: string;
    extra: string;
    image: string;
    phone: string;
    rname: string;
    status: string;
    added_on: number;
    location: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class PeopleService {
  people: Person[] = []
  i = new Date().getTime()
  constructor( private ls:LocationService, private http: HttpClient) {}
   private isLocationCounted = false;

   public updateEvent: Subject<void> = new Subject<void>();

   emitUpdateEvent() {
    this.updateEvent.next();
  }

  get(): Observable<Person[]> {
    return this.http.get<Person[]>('https://272.selfip.net/apps/1n2Rtx02rs/collections/a4/documents/')
      .pipe(
        tap((data: Person[]) => {
          this.people = data;
          if (!this.isLocationCounted) {
            this.people.forEach(person => {
              this.ls.addCount(person.data.location);
            });
            this.isLocationCounted = true;
          }
        })
      );
  }

   add(newPerson:Person['data']){
    const temp = this.i.toString()
    newPerson.added_on = (new Date()).getTime()
    newPerson.status = 'Open'
    this.people.push({ key: temp, data: newPerson })
    this.http.post('https://272.selfip.net/apps/1n2Rtx02rs/collections/a4/documents/',{
      "key": temp,
      "data": newPerson
    }).subscribe(()=>{})
   }

   delete(del_person:Person): Observable<any> {
    const deleteUrl = `https://272.selfip.net/apps/1n2Rtx02rs/collections/a4/documents/${del_person}/`;
    return this.http.delete<void>(deleteUrl).pipe(
      tap(() => {
        this.emitUpdateEvent();
      })
    );
   }

  getByName(name: string): Observable<any> {
    return this.get().pipe(
      map(people => people.find(person => person.data.name === name))
    );
  }

  updateStatus(name: string, newStatus: string): Observable<void> {
    const person = this.people.find(p => p.data.name === name);
  
    if (person) {
      const updateUrl = `https://272.selfip.net/apps/1n2Rtx02rs/collections/a4/documents/${person.key}/`;
  
      const updatedPerson = {
        key: person.key,
        data: { ...person.data, status: newStatus }
      };
  
      return this.http.put<void>(updateUrl, updatedPerson).pipe(
        tap(() => {
            console.log('Successfully updated status:', updatedPerson);
            this.emitUpdateEvent();
          }
        )
      );
    }
    else {
      return new Observable<void>();
    }
  }
  
}
