import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Item } from './models/item';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ItemService { 
  itemsCollection: AngularFirestoreCollection<Item>;
  items: Observable<Item[]>;
  itemDoc: AngularFirestoreDocument<Item>;
  constructor(public afs: AngularFirestore) { 
    //this.items = this.afs.collection('items').valueChanges();
    this.itemsCollection = this.afs.collection('items', ref => ref.orderBy('title','asc'));
    this.items = this.itemsCollection.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Item;
        data.id = a.payload.doc.id;
        return data;
      })
    });
  }

  getItems(){
    return this.items;
  }

  addItem(item: Item){ 
    console.log(item);
    this.itemsCollection.add(item);
  }

  formatDate(date: Date): string {
    
    const month = date.getMonth() +1;
    const day = date.getDate();
    const year = date.getFullYear();

    return `${year}-${date}-${day}`;
  }

  deleteItem(item: Item){
    this.itemDoc = this.afs.doc(`items/${item.id}`);
    this.itemDoc.delete();
  }

  updateItem(item: Item) {
    this.itemDoc = this.afs.doc(`items/${item.id}`);
    this.itemDoc.update(item);
  }
}

