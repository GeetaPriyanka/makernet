import { Component, OnInit } from '@angular/core';
import { ItemService } from '../item.service';
import { Item } from '../models/Item';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {
  dateAdded: any;
  firebaseService: any;
  item: Item = {
    title: '',
    description:'',
    date:''
  }
  constructor(private itemService: ItemService) { }

  ngOnInit() {
  }

  updateDateAdded(dateAdded){
    this.dateAdded = this.firebaseService.formatDate(dateAdded);
  }

  onSubmit(){
    if(this.item.title !='' && this.item.description != ''){
      this.itemService.addItem(this.item);
      this.item.title='';
      this.item.description='';
      this.item.date='';
      
    }
  }

}
