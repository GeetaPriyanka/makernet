import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { UserService } from '../user.service';
import { User } from '@firebase/auth-types';
import { MakerspaceUser } from '../models/makerspace-user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  exampleData: any;
  exampleDataSubscription: Subscription;

  constructor(public afAuth: AngularFireAuth, private router: Router, public db: AngularFireDatabase, private userService: UserService) { }

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
    
    this.exampleDataSubscription = this.db.list('/exampleData').valueChanges().subscribe(
      exampleData => {
        this.exampleData = exampleData;
        console.log(this.exampleData);
      });

      
  }

  ngOnDestroy() {
    this.exampleDataSubscription.unsubscribe();
  }

  addUser() {
    let newUser: MakerspaceUser = new MakerspaceUser();
    newUser.displayName = this.afAuth.auth.currentUser.displayName;
    newUser.email = this.afAuth.auth.currentUser.email;
    newUser.avatar = this.afAuth.auth.currentUser.photoURL;
    newUser.id = this.afAuth.auth.currentUser.uid;
    this.userService.addUser(newUser);
  }

  user: MakerspaceUser;
  getCurrentUser() {
    this.user = this.userService.getCurrentUser();
  }
  updateUser() {
    this.user.bio = "Test updating user bio";
    this.user = this.userService.updateUser(this.user);
  }

}
