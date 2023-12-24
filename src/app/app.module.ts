import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { PersonComponent } from './person/person.component';
import { PeopleListComponent } from './people-list/people-list.component';
import { PersonAddFormComponent } from './person-add-form/person-add-form.component';
import { RoutingModule } from './routing.module';
import { PeopleService } from './people.service';
import { PersonMoreInfoComponent } from './person-more-info/person-more-info.component';
import { MapComponent } from './map/map.component';
import { AddLocationComponent } from './add-location/add-location.component';
import { HttpClientModule } from '@angular/common/http';
import { LocationService } from './location.service';

@NgModule({
  declarations: [
    AppComponent,
    PersonComponent,
    PeopleListComponent,
    PersonAddFormComponent,
    PersonMoreInfoComponent,
    MapComponent,
    AddLocationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RoutingModule,
    HttpClientModule
  ],
  providers: [PeopleService, LocationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
