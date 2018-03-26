import { CanActivate, Router } from '@angular/router';
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase } from 'angularfire2/database';


import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthGuard implements CanActivate {

  user: Observable<firebase.User>;

  constructor(private afAuth: AngularFireAuth, private router: Router, private db: AngularFireDatabase) {
    this.afAuth.authState.subscribe(auth => { 
      if(auth) {
        this.user = afAuth.authState;
        this.router.navigateByUrl('/dashboard');
      }
    });
  }

  canActivate(): Observable<boolean> {
    return Observable.from(this.afAuth.authState)
      .take(1)
      .map(state => !!state)
      .do(authenticated => {
    if 
      (!authenticated) this.router.navigate([ '/login' ]);
    })
  }


 
}
