import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { MakerspaceGallery } from '../models/makerspace-gallery';
import { MakerspaceImage } from '../models/makerspace-image';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-gallery-add',
  templateUrl: './gallery-add.component.html',
  styleUrls: ['./gallery-add.component.css']
})
export class GalleryAddComponent implements OnInit {

  newGallery: MakerspaceGallery;
  filesToUpload: File[];


  constructor(private ds: DataService) {
    this.newGallery = new MakerspaceGallery();
  }

  ngOnInit() {
  }

  createGallery() {
    this.ds.addGallery(this.newGallery, this.filesToUpload);
  }

  logGalleryObj() {
    console.log(this.newGallery);
  }

  setFiles(event) {
    this.filesToUpload = event.target.files;
  }

  /* addImageToGallery(event) {
    for (let file of event.target.files) {
      let newImage = new MakerspaceImage();
      this.ds.uploadImage(file, result => {
        newImage.imageUrl = result.url;
        this.ds.timestamp(newImage);
        this.newGallery.images.push(newImage);
      });
    }
    
    //this.ds.addImageToGallery(event.target.files[0], this.newGallery.id);
  } */

}
