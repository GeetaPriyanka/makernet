import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MakerspaceProject } from '../models/makerspace-project';
import { AngularFireStorage } from 'angularfire2/storage';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { MakerspaceGallery } from '../models/makerspace-gallery';


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
  toUpdate: any;
  contribute: any;
  submitEnabled: boolean = true;
  projectData: any;
  projectDataSubscription: Subscription;
  item: any[];
  gallery: any;
  galleryData: Subscription;
  addSuccess: any;

  project: MakerspaceProject = new MakerspaceProject();
  update: MakerspaceProject = new MakerspaceProject();
  selected: MakerspaceProject;

  constructor(private angularFire: AngularFireDatabase, private afStorage: AngularFireStorage, private ds: DataService, private router: Router) {

    this.firebase = this.angularFire.list('/projects');
  }


  ngOnInit() {

    this.projectDataSubscription = this.angularFire.list('/projects').valueChanges().subscribe(
      projectData => {
        this.projectData = projectData;
        console.log(this.projectData);
      });

    this.galleryData = this.angularFire.list('/galleries').valueChanges().subscribe(
      gallery => {
        this.gallery = gallery;
      });
  }



  
  onSubmit(f: NgForm) {
    console.log(this.project);
    /*if (this.project) {
      this.firebase.push({
        title: this.project.title,
        description: this.project.description,
        image_url : this.URL,
        createdDate: (new Date()).getTime()}).then((project) => { console.log(project.key); });
      f.reset();
     }*/
     this.ds.addProject(this.project);
     this.project = new MakerspaceProject();
     this.addSuccess = true;
  }

 
  upload(event) {
    this.toggleSubmitEnabled();
    let upload = this.ds.uploadImage(event.target.files[0], 
    result => {
      this.project.imageUrl = result.url;
      this.toggleSubmitEnabled();
    });
  }

  toggleSubmitEnabled() {
    this.submitEnabled = !this.submitEnabled;
  }
  showProject(project) {
    this.selected = new MakerspaceProject();
    this.selected = project;
    console.log(this.selected.id);
    console.log(this.ds.getCurrentUser().id);

    this.galleryData = this.angularFire.list('/galleries' + this.ds.getCurrentUser().id + '/' + this.selected.id).valueChanges().subscribe(
      gallery => gallery.forEach(item => {
        this.gallery = item;
        console.log(this.gallery);
      }));
  }

  updateProject(project) {

    this.toUpdate = project;
    console.log(this.toUpdate);

  }

  onSubmitUpdate() {
    console.log(this.toUpdate);
    this.ds.updateProject(this.toUpdate);

  }

 

  }

