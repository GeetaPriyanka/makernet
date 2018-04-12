import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireStorage } from 'angularfire2/storage';
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from 'firebase/app';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable'

import { MakerspaceEvent } from './models/makerspace-event';
import { MakerspaceEquipment } from './models/makerspace-equipment';
import { MakerspaceProject } from './models/makerspace-project';
import { MakerspaceUser } from './models/makerspace-user';
import { Timestamped } from './models/timestamped';
import { MakerspaceGallery } from './models/makerspace-gallery';
import { MakerspaceImage } from './models/makerspace-image';
import { MakerspaceSpace } from './models/makerspace-space';

@Injectable()
export class DataService {

  private currentUser: MakerspaceUser;
  private currentUserSub: Subscription;
  private authStateSub: Subscription;
  private uid: string;

  constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase, private afStorage: AngularFireStorage, private router: Router) { 
    this.authStateSub = this.afAuth.authState.subscribe(auth => {
      if (auth) {
        this.uid = auth.uid;
        if (this.currentUserSub) {
          this.currentUserSub.unsubscribe();
        }
        this.currentUserSub = this.db.object<MakerspaceUser>('/users/' + this.uid).valueChanges().subscribe(
          user => {this.currentUser = user}
        );
      }
      this.uid = null;
      this.currentUser = null;
    });
  }

  logout() {
    this.afAuth.auth.signOut().then(
      (success) => {
        this.router.navigate(['/login']);
      }).catch(
      (err) => {
        //this.error = err;
      })
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

  getEvent(eventId: string): Observable<MakerspaceEvent> {
    return this.getDbObject<MakerspaceEvent>('/events' + eventId);
  }

  listEvents(): Observable<MakerspaceEvent[]> {
    return this.getDbList<MakerspaceEvent>('/events');
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

  getEquipment(equipmentId: string): Observable<MakerspaceEquipment> {
    return this.getDbObject<MakerspaceEquipment>('/equipment' + equipmentId);
  }

  listEquipment(): Observable<MakerspaceEquipment[]> {
    return this.getDbList<MakerspaceEquipment>('/equipment');
  }

  addSpace(space: MakerspaceSpace) {
  //  this.update('/spaces', this.prepareUpdate(space));
  }

  deleteSpace(id: string) {
    this.db.object('/spaces' + id).remove();
  }

  updateSpace(space: MakerspaceSpace) {
  //  this.update('/spaces', this.prepareUpdate(space));
  }

  getSpace(spaceId: string): Observable<MakerspaceSpace> {
    return this.getDbObject<MakerspaceSpace>('/spaces' + spaceId);
  }

  listSpaces(): Observable<MakerspaceSpace[]> {
    return this.getDbList<MakerspaceSpace>('/spaces');
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

  getProject(projectId: string): Observable<MakerspaceProject> {
    return this.getDbObject<MakerspaceProject>('/projects' + projectId);
  }

  listProjects(): Observable<MakerspaceProject[]> {
    return this.getDbList<MakerspaceProject>('/projects');
  }

  addGallery(gallery: MakerspaceGallery) {
    this.update('/galleries', this.prepareUpdate(gallery));
  }

  updateGallery(gallery: MakerspaceGallery) {
    this.update('/galleries', this.prepareUpdate(gallery));
  }

  addImageToGallery(image: File, galleryId:string) {
    let newImage = new MakerspaceImage();
    this.uploadImage(image, (result) => {
      newImage.imageUrl = result.url;
    }).then(() => {
      this.db.list('/galleries/' + galleryId).push(this.timestamp(newImage));
    });
  }

  getGallery(galleryId: string): Observable<MakerspaceGallery> {
    return this.db.object<MakerspaceGallery>('/galleries/' + galleryId).valueChanges();
  }

  getGalleriesByUser(userId: string): Observable<MakerspaceGallery[]> {
    return this.db.list<MakerspaceGallery>('/galleries', ref => ref.orderByChild('owner').equalTo(userId)).valueChanges();
  }

  uploadImage(image: File, callback: Function) {
    let result = { url: '', uid: '', success: false };
    let task: Promise<any>;

    if (image.type.match('image.*')) {
      task =  this.afStorage.ref(this.uid + '/' + Math.random().toString(36)).put(image).then(
        image => {
          result.url = image.downloadURL;
          result.success = true;
          callback(result);
        }
      )
    }

    return task;
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
    data.owner = this.uid;
    
    let update = {};
    update[data.id] = this.timestamp(data);

    if (this.hasEmptyProperty(data)) {return null} 
    else {return update}
  }

  private hasEmptyProperty(data: Timestamped) {
    /* for (let prop of Object.getOwnPropertyNames(data)) {
      if (!data[prop]) {
        return true;
      }
    } */
    return false;
  }

  private update(location: string, update: Object) {
    if (update) this.db.object(location).update(update);
  }

  private getDbObject<T>(path: string): Observable<T> {
    return this.db.object<T>(path).valueChanges();
  } 

  private getDbList<T>(path: string): Observable<T[]> {
    return this.db.list<T>(path).valueChanges();
  }

}
