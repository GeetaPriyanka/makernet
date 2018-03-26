import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MakerspaceProject } from '../models/makerspace-project';
import { AngularFireStorage } from 'angularfire2/storage';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  public title;
  public desc;
  public firebase;
  public URL;
  public projects: MakerspaceProject[];



  project: MakerspaceProject = {
    title: "",
    description : ""
  }
  constructor(private angularFire: AngularFireDatabase, private afStorage: AngularFireStorage) {

    this.firebase = this.angularFire.list('/projects');
  }


  
  onSubmit(f: NgForm) {
    console.log(this.project);
    if (this.project) {
      this.firebase.push({
        title: this.project.title,
        description: this.project.description,
        image_url : this.URL,
        createdDate: (new Date()).getTime()}).then((project) => { console.log(project.key); });
      f.reset();
     }
  }

  upload(event) {
    // create a random id
    const randomId = Math.random().toString(36).substring(2);
    // create a reference to the storage bucket location
    this.afStorage.ref(randomId).put(event.target.files[0]).then((image) => { this.URL =image.downloadURL; });;
    // the put method creates an AngularFireUploadTask
    // and kicks off the upload
  }
    ngOnInit() {

   
    }
  }

