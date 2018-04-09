import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Item } from '../models/Item';
import { MakerspaceEvent } from '../models/makerspace-event';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
events: MakerspaceEvent[];
editState: boolean= false;
eventToEdit: MakerspaceEvent;
  constructor(private ds: DataService) { }

  ngOnInit() {
    this.ds.listEvents().subscribe(events => {
      //console.log(items);
      this.events = events;
    });
  }

    deleteItem(event: MakerspaceEvent){
      this.clearState();
      this.ds.deleteEvent(event.id);

    }
  editItem(event: MakerspaceEvent) {
    this.editState = true;
    this.eventToEdit = event;

  }
  clearState() {
    this.editState = false;
    this.eventToEdit= null;
  }

  updateItem(event: MakerspaceEvent) {
    this.ds.updateEvent(event);
    this.clearState();
  }
}
