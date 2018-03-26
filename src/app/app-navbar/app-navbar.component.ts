import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-navbar',
  templateUrl: './app-navbar.component.html',
  styleUrls: ['./app-navbar.component.css']
})
export class AppNavbarComponent implements OnInit {

  constructor(public afAuth: AngularFireAuth, private router: Router, public db: AngularFireDatabase) { }

logout() {
  this.afAuth.auth.signOut().then(
    (success) => {
      this.router.navigate(['/login']);
    }).catch(
    (err) => {
      //this.error = err;
    })
}


  ngOnInit() {
  }

}
