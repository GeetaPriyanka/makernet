import { Component } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import * as firebase from 'firebase';
import { AngularFireObject } from 'angularfire2/database';
import { Observable } from '@firebase/util';
import { MakerspaceGallery } from '../models/makerspace-gallery';
import { DataService } from '../data.service';
import { Subscription } from 'rxjs';
import { MakerspaceUser } from '../models/makerspace-user';


interface featuredPhotosUrls {
  url1?: string;
  url2?: string;
}

interface Photo{
  url: string;
}

@Component({
  selector: 'app-root1',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent {
  
  gallerySubscription: Subscription;
  userGalleries: Array<MakerspaceGallery>;

  featuredPhotoStream: any
  //photoListStream:any
  photoListStream: AngularFireList<any>
  //featuredPhotoStream: AngularFireObject<featuredPhotosUrls>; 
  // //In the latest version FirebaseObjectObservable and FirebaseListObservable are removed and instead we use : AngularFireObject & AngularFireList

  userSub: Subscription;
  currentUser: firebase.User;

  constructor(private db: AngularFireDatabase, private ds: DataService){
    this.featuredPhotoStream = this.db.object('/photos/featured').valueChanges();
    this.photoListStream = this.db.list('/photos/list');

    this.userSub = this.ds.getCurrentUser().subscribe(user => {
      this.currentUser = user;
    });

    this.gallerySubscription = this.ds.getGalleriesByUser(this.currentUser.uid).subscribe(
      galleries => {
        this.userGalleries = galleries;
    });
  }

  logGalleries() {
    console.log(this.userGalleries);
  }
  

  featuredPhotoSelected(event: any, photoName:string)  {
    const file: File = event.target.files[0];
    const metaData = {'contentType':file.type};
    const storageRef: firebase.storage.Reference = firebase.storage().ref('/photos/featured/'+photoName);
    const uploadTask: firebase.storage.UploadTask = storageRef.put(file,metaData);
    console.log("Uploading filename: ",file.name);
    
    uploadTask.then((uploadSnapshot:firebase.storage.UploadTaskSnapshot)=>{
      console.log("Upload is complete!!");
      firebase.database().ref('/photos/featured/'+photoName).set(uploadSnapshot.downloadURL);
    });
  
      
    }
    photoImageList(event:any){
    const file: File = event.target.files[0];
    const metaData = {'contentType':file.type};
    const nextKey = this.photoListStream.push({}).key;
    const storageRef: firebase.storage.Reference = firebase.storage().ref('/photos/list/'+nextKey);
    const uploadTask: firebase.storage.UploadTask = storageRef.put(file,metaData);
    console.log("Uploading filename: ",file.name);
      
    uploadTask.then((uploadSnapshot:firebase.storage.UploadTaskSnapshot)=>{
      console.log("Upload is complete!!");

      this.photoListStream.update(nextKey,uploadSnapshot.downloadURL);
  });
}  
}
