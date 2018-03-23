import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { moveIn, fallIn } from '../router.animations';

import { AuthGuard } from '../auth.service';
import { DataService } from '../data.service';
import { MakerspaceUser } from '../models/makerspace-user';

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

  constructor(public afAuth: AngularFireAuth,private router: Router, private dataservice: DataService, public authGuard: AuthGuard) {
  }

  onSubmit(formData) {
    if(formData.valid) {
      this.afAuth.auth.createUserWithEmailAndPassword(formData.value.email, formData.value.password).then(
        (success) => {
          /*this.newUser.name = this.displayName;
          this.newUser.id = this.afAuth.auth.currentUser.uid;
          this.newUser.email = this.email;
          console.log("USER:" + this.newUser);
          console.log("UID: " + this.afAuth.auth.currentUser.uid);
          this.dataservice.addUser(this.newUser);*/
      }).then(
        (success) => {
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
