import { Subscription } from 'rxjs/Subscription';
import { DataService } from '../data.service';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MakerspaceProject } from '../models/makerspace-project';
import { AngularFireStorage } from 'angularfire2/storage';
import { NgForm } from '@angular/forms';
import {swal} from 'ng2-sweetalert2';
import "ng2-sweetalert2";

@Component({
  selector: 'app-contributions',
  templateUrl: './contributions.component.html',
  styleUrls: ['./contributions.component.css']
})
export class ContributionsComponent implements OnInit {

  public firebase;
  projectData: any;
  uploaded: any;
  projectDataSubscription: Subscription;
  project: MakerspaceProject = new MakerspaceProject();
  submitEnabled: boolean = true;
  selectedValue: MakerspaceProject = new MakerspaceProject();

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

  onProjectChange() {
    console.log('Project Changed: ' + this.selectedValue.title);


  }
  onSubmit(f: NgForm) {
    console.log(this.selectedValue);
    f.reset();
    if (this.upload) {
      this.uploaded = true;
    }
  }
  upload(event) {

    this.toggleSubmitEnabled();
    console.log('id ' + this.selectedValue.id);

    let upload = this.ds.addImageToProject(event.target.files[0], this.selectedValue.id);
    console.log(this.upload);
    
  }
  

  toggleSubmitEnabled() {
    this.submitEnabled = !this.submitEnabled;
  }
 
}


