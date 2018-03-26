import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from "angularfire2/auth";
import { MakerspaceUser } from './models/makerspace-user';
import { Timestamped } from './models/timestamped';

import * as firebase from 'firebase/app';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { Subscription } from 'rxjs/Subscription';

@Injectable()
export class UserService {

  private currentUser: MakerspaceUser;
  private currentUserSub: Subscription;
  private uid: string;

  constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase) { 
    this.afAuth.authState.subscribe(auth => {
      this.uid = auth.uid;
      if (this.currentUserSub) {
        this.currentUserSub.unsubscribe();
      }
      this.currentUserSub = this.db.object<MakerspaceUser>('/users/' + this.uid).valueChanges().subscribe(
        user => {this.currentUser = user}
      );
    });
  }

  addUser(user: MakerspaceUser) {
    user.id = this.uid;
    if(user.id) {
      var newUserData = {};
      newUserData[user.id] = this.timestamp(user);
      this.db.object('/users').update(newUserData);
    }
  }

  updateUser(user: MakerspaceUser) {
    user.id = this.uid;
    if(user.id) {
      user.updated_at = firebase.database.ServerValue.TIMESTAMP;
      var newUserData = {};
      newUserData[user.id] = user;
      this.db.object('/users').update(newUserData);
    }
    return this.currentUser;
  }

  getCurrentUser() {
    return this.currentUser;
  }

  timestamp(data) {
    data.updated_at = firebase.database.ServerValue.TIMESTAMP;

    if (!data.hasOwnProperty('created_at')) {
      data.created_at = firebase.database.ServerValue.TIMESTAMP;
    }

    return data;
  }
}
