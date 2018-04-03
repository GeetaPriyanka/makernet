import { Injectable } from '@angular/core';

import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireStorage } from 'angularfire2/storage';
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from 'firebase/app';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { Subscription } from 'rxjs/Subscription';

import { MakerspaceEvent } from './models/makerspace-event';
import { MakerspaceEquipment } from './models/makerspace-equipment';
import { MakerspaceProject } from './models/makerspace-project';
import { MakerspaceUser } from './models/makerspace-user';
import { Timestamped } from './models/timestamped';

@Injectable()
export class DataService {

  private currentUser: MakerspaceUser;
  private currentUserSub: Subscription;
  private authStateSub: Subscription;
  private uid: string;

  constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase, private afStorage: AngularFireStorage) { 
    this.authStateSub = this.afAuth.authState.subscribe(auth => {
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
    this.update('/users', this.prepareUpdate(user));
  }

  updateUser(user: MakerspaceUser) {
    this.update('/users', this.prepareUpdate(user));
  }

  getCurrentUser() {
    return this.currentUser;
  }

  addEvent(msEvent: MakerspaceEvent) {
    this.update('/events', this.prepareUpdate(msEvent));
  }

  deleteEvent(id: string) {
    this.db.object('/events/' + id).remove();
  }

  updateEvent(msEvent: MakerspaceEvent) {
    this.update('/events', this.prepareUpdate(msEvent));
  }

  addEquipment(equipment: MakerspaceEquipment) {
    this.update('/equipment', this.prepareUpdate(equipment));
  }

  deleteEquipment(id: string) {
    this.db.object('/equipment/' + id).remove();
  }

  updateEquipment(equipment: MakerspaceEquipment) {
    this.update('/equipment', this.prepareUpdate(equipment));
  }

  addProject(project: MakerspaceProject) {
    this.update('/projects', this.prepareUpdate(project));
  }

  deleteProject(id: string) {
    this.db.object('/projects/' + id).remove();
  }

  updateProject(project: MakerspaceProject) {
    this.update('/projects', this.prepareUpdate(project));
  }

  uploadImage(image: File, callback: Function) {
    let result = { url: '', uid: '', success: false };

    if (image.type.match('image.*')) {
      this.afStorage.ref(this.uid + '/' + Math.random().toString(36)).put(image).then(
        image => {
          result.url = image.downloadURL;
          result.success = true;
          callback(result);
        }
      )
    }
  }

  private timestamp(data: Timestamped) {
    data.updated_at = firebase.database.ServerValue.TIMESTAMP;

    if (!data.hasOwnProperty('created_at') || !data.created_at) {
      data.created_at = firebase.database.ServerValue.TIMESTAMP;
    }

    return data;
  }

  private prepareUpdate(data: Timestamped) {
    if (!data.id) {
      (data instanceof MakerspaceUser) ?
        data.id = this.uid : data.id = this.db.createPushId();
    }
    
    let update = {};
    update[data.id] = this.timestamp(data);

    if (this.hasEmptyProperty(data)) {return null} 
    else {return update}
  }

  private hasEmptyProperty(data: Timestamped) {
    for (let prop of Object.getOwnPropertyNames(data)) {
      if (!data[prop]) {
        return true;
      }
    }
    return false;
  }

  private update(location: string, update: Object) {
    if (update) this.db.object(location).update(update);
  }

}
