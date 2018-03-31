import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MakerspaceProject } from '../models/makerspace-project';
import { AngularFireStorage } from 'angularfire2/storage';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { DataService } from '../data.service';


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
  selected: any[];

  submitEnabled: boolean = true;
  projectData: any;
  projectDataSubscription: Subscription;


  project: MakerspaceProject = new MakerspaceProject();
  constructor(private angularFire: AngularFireDatabase, private afStorage: AngularFireStorage, private ds: DataService) {

    this.firebase = this.angularFire.list('/projects');
  }


  ngOnInit() {

    this.projectDataSubscription = this.angularFire.list('/projects').valueChanges().subscribe(
      projectData => {
        this.projectData = projectData;
        console.log(this.projectData);
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
    this.selected = project;
    console.log(project.title);
    console.log(project.description);

  }
  }

