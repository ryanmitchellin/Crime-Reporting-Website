import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { PeopleService } from '../people.service';
import { Router } from '@angular/router';
import { LocationService } from '../location.service';

import * as Model from '../location.service'
import Location = Model.Location

@Component({
  selector: 'app-person-add-form',
  templateUrl: './person-add-form.component.html',
  styleUrls: ['./person-add-form.component.css']
})
export class PersonAddFormComponent{
  form: FormGroup
  locations: Location[]=[];
  phoneMessage: string | null = null;
  errorMessage: string | null = null;
  constructor(private ps:PeopleService, private router: Router, private ls:LocationService){
    let formControls = {
      rname: new FormControl('',[Validators.required]),
      phone: new FormControl('', [Validators.required, Validators.pattern(/^\d{3}-\d{3}-\d{4}$/)]),
      location: new FormControl('',[Validators.required]),
      name: new FormControl('',[Validators.required]),
      extra: new FormControl('',[Validators.required]),
      image: new FormControl()
    }
    this.form = new FormGroup(formControls)
    this.locations = this.ls.get();
    this.phoneMessage = null;
    this.errorMessage = null;
  }

  onSubmit(newPerson:any){
    if(this.form.valid){
      this.ps.add(newPerson)
      const selectedLocation = this.form.get('location')!.value;
      this.ls.addCount(selectedLocation);
      setTimeout(() => {
        window.location.reload()
      }, 100);
      this.router.navigate(["/people"])
    }
    else {
      this.errorMessage = "Check your input for all required fields";
    }
  }

  checkRequired(){
    if(this.form.valid){
      this.errorMessage = null;
    }
  }

  checkPhone(field:string){
    if(this.form.get(field)!.valid){
      this.phoneMessage = null;
    }
    else {
      this.phoneMessage = "Phone format: XXX-XXX-XXXX";
    }
  }

}
