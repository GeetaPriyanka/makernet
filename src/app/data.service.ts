import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from "angularfire2/auth";
import { MakerspaceUser } from './models/makerspace-user';

import * as firebase from 'firebase/app';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

@Injectable()
export class DataService {

  constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase) { }

  timestamp(data) {
    data.updated_at = firebase.database.ServerValue.TIMESTAMP;

    if (!data.hasOwnProperty('created_at')) {
      data.created_at = firebase.database.ServerValue.TIMESTAMP;
    }

    return data;
  }
}
