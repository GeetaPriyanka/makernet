import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  exampleData: any;
  exampleDataSubscription: Subscription;

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
    
    this.exampleDataSubscription = this.db.list('/exampleData').valueChanges().subscribe(
      exampleData => {
        this.exampleData = exampleData;
        console.log(this.exampleData);
      });
  }

  ngOnDestroy() {
    this.exampleDataSubscription.unsubscribe();
  }



}
