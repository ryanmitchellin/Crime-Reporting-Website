import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LocationService } from '../location.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.component.html',
  styleUrls: ['./add-location.component.css']
})
export class AddLocationComponent {
  locForm : FormGroup
  constructor(private ls:LocationService, private router: Router){
    let locControls = {
      location: new FormControl('',[Validators.required]),
      latitude: new FormControl('',[Validators.required]),
      longitude: new FormControl('',[Validators.required])
    }
    this.locForm = new FormGroup(locControls)
  }

  onSubmit(newLoc:any){
    this.ls.add(newLoc)
    this.router.navigate(["/person/add"])
  }
}
