import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PeopleListComponent } from './people-list/people-list.component';
import { PersonAddFormComponent } from './person-add-form/person-add-form.component';
import { PersonMoreInfoComponent } from './person-more-info/person-more-info.component';
import { AddLocationComponent } from './add-location/add-location.component';

const appRoutes:Routes = [
  { path: '', redirectTo: 'people', pathMatch: 'full' },
  { path: 'people', component: PeopleListComponent},
  { path: 'person/add', component: PersonAddFormComponent},
  { path: 'person/moreinfo/:name', component: PersonMoreInfoComponent},
  { path: 'people/addlocation', component: AddLocationComponent}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class RoutingModule { }
