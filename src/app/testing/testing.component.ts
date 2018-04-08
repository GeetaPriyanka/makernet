import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { DataService } from '../data.service';
import { MakerspaceUser } from '../models/makerspace-user';
import { MakerspaceEvent } from '../models/makerspace-event';

@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.css']
})
export class TestingComponent implements OnInit {

  exampleData: any;
  exampleDataSubscription: Subscription;

  constructor(public afAuth: AngularFireAuth, private router: Router, public db: AngularFireDatabase, private ds: DataService) { }

  logout() {
    this.ds.logout();
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
    newUser.imageUrl = this.afAuth.auth.currentUser.photoURL;
    newUser.id = this.afAuth.auth.currentUser.uid;
    this.ds.addUser(newUser);
  }

  addEvent() {
    let newEvent: MakerspaceEvent = new MakerspaceEvent();
    newEvent.owner = this.ds.getCurrentUser().id;
    newEvent.location = "HQ";
    newEvent.start = "Monday";
    newEvent.end = "Tuesday";
    newEvent.description = "Test Event";
    this.ds.addEvent(newEvent);
  }

  deleteEvent() {
    this.ds.deleteEvent("-L8rUrJJ0i1S2vCTlHaW");
  }

  user: MakerspaceUser;
  getCurrentUser() {
    this.user = this.ds.getCurrentUser();
  }
  updateUser() {
    this.user.bio = "Test updating user bio";
    this.ds.updateUser(this.user);
    this.getCurrentUser();
  }

}
