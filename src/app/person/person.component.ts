import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent {
  @Input() person: any
  @Output() delete = new EventEmitter()

  constructor(private router: Router){}

  onDelete(evt: any, perToDelete: string) {
    const enteredPassword = prompt('Enter password:');
  
    if (enteredPassword !== null) {
      const hashifyApiUrl = `https://api.hashify.net/hash/md5/hex?value=${enteredPassword}`;

      fetch(hashifyApiUrl)
        .then(response => response.json())
        .then(data => {
          const hashedPassword = data.Digest;
          if (hashedPassword === 'fcab0453879a2b2281bc5073e3f5fe54') {
            evt['delete_person'] = perToDelete;
            this.delete.emit(evt);
          } else {
            alert('Incorrect password. Deletion canceled.');
          }
        })
        .catch(error => {
          console.error('Error fetching hashed password:', error);
          alert('Error fetching hashed password. Deletion canceled.');
        });
    } else {
      alert('Deletion canceled.');
    }
  }
  
  onMoreInfo(){
    this.router.navigate(['/person/moreinfo', this.person.data.name])
  }
  
}
