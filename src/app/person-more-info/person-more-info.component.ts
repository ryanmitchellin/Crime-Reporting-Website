import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PeopleService } from '../people.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-person-more-info',
  templateUrl: './person-more-info.component.html',
  styleUrls: ['./person-more-info.component.css']
})
export class PersonMoreInfoComponent {
  person: any;
  showStatusOptions: boolean = false;
  newStatus: string = 'Open';

  constructor(private route: ActivatedRoute, private ps: PeopleService, private router: Router) {}

  ngOnInit(): void {
    const name = this.route.snapshot.paramMap.get('name');
    this.ps.getByName(name!).subscribe( myperson => {
        this.person = myperson
      }
    );
  }

  back(){
    this.router.navigate(['/people'])
  }

  changeStatus() {
    const enteredPassword = prompt('Enter password:');

    if (enteredPassword !== null) {
      const hashifyApiUrl = `https://api.hashify.net/hash/md5/hex?value=${enteredPassword}`;

      fetch(hashifyApiUrl)
        .then(response => response.json())
        .then(data => {
          const hashedPassword = data.Digest;
          if (hashedPassword === 'fcab0453879a2b2281bc5073e3f5fe54') {
            this.showStatusOptions = !this.showStatusOptions;
          } else {
            alert('Incorrect password. Status change canceled.');
          }
        })
        .catch(error => {
          console.error('Error fetching hashed password:', error);
          alert('Error fetching hashed password. Status change canceled.');
        });
    } else {
      alert('Status change canceled.');
    }
  }

  confirmStatusChange() {
    this.ps.updateStatus(this.person.data.name, this.newStatus).subscribe(() => {
        this.showStatusOptions = false;
      }
    );
  }
}
