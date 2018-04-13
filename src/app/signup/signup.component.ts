import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { moveIn, fallIn } from '../router.animations';
import { DataService } from '../data.service';

import { MakerspaceUser } from '../models/makerspace-user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  animations: [moveIn(), fallIn()],
  host: {'[@moveIn]': ''}
})
export class SignupComponent implements OnInit {

  state: string = '';
  error: any;
  newUser: MakerspaceUser;

  email: string;
  password: string;
  displayName: string;

  userSub: Subscription;

  constructor(public afAuth: AngularFireAuth,private router: Router, private ds: DataService) {
  }

  onSubmit(formData) {
    if(formData.valid) {
      this.afAuth.auth.createUserWithEmailAndPassword(formData.value.email, formData.value.password).then(
        (success) => {
          
          this.userSub = this.ds.getCurrentUser().subscribe(user => {
            console.log(user.uid);
            //add user to firebase below:
            
          });
      }).then(success => {
        this.router.navigate(['/dashboard']);
      }).catch(
        (err) => {
        this.error = err;
      })
    }
  }

  ngOnInit() {
  }

}
