import { Component, OnInit } from '@angular/core';
import { ItemService } from '../item.service';
import { DataService } from '../data.service';
import { MakerspaceEvent } from '../models/makerspace-event';
import { Item } from '../models/Item';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {
  dateAdded: any;
  firebaseService: any;
  event: MakerspaceEvent;

  constructor(private ds: DataService) { 
    this.event = new MakerspaceEvent();
  }

  ngOnInit() {
  }

  updateDateAdded(dateAdded){
    this.dateAdded = this.firebaseService.formatDate(dateAdded);
  }

  onSubmit(){
    if(this.event.title !='' && this.event.description != ''){
      this.ds.addEvent(this.event);
      this.event = new MakerspaceEvent();
      
    }
  }

}
