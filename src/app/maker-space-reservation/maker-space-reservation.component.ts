import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireStorage } from 'angularfire2/storage';
import { Subscription } from 'rxjs/Subscription';
import { NgForm } from '@angular/forms';
import { searchForReservation } from '../models/searchForReservation';
import { MakerspaceReservable } from '../models/makerspace-reservable';
import { MakerspaceSpace } from '../models/makerspace-space';



@Component({
  selector: 'app-maker-space-resevation',
  templateUrl: './maker-space-reservation.component.html',
  styleUrls: ['./maker-space-reservation.component.css']
})
export class MakerSpaceReservationComponent implements OnInit {
  SpaceSubscription: Subscription;
  space1: any;
  space2: any;
  space3: any;
  space4: any;

  public firebase;
  selected: any[];
  availableList: MakerspaceSpace[]=[]; // if it's a class member

  count: number;
  noRooms: string;
  availableRooms: MakerspaceSpace[];
  reservation: any;
  available: any;


  time: string;



  searchForReservation: searchForReservation = new searchForReservation();

  constructor(private angularFire: AngularFireDatabase, private afStorage: AngularFireStorage) {

    this.firebase = this.angularFire.list('/Spaces');
    this.count = 0;
  }
  ngOnInit() {

    this.SpaceSubscription = this.angularFire.list('/Spaces').valueChanges().subscribe(
      available => {
        this.available = available;
      });
    this.SpaceSubscription = this.angularFire.list('/Reservation').valueChanges().subscribe(
      reservation => {
        this.reservation = reservation;
      });
  }

  onSubmit(f: NgForm) {
    this.count = 0;
    this.noRooms = null;


    console.log(this.searchForReservation);
    this.firebase = this.angularFire.list('/Reservation');
    this.time = this.searchForReservation.hour + ":" + this.searchForReservation.min + " PM";

    this.SpaceSubscription = this.angularFire.list('/Reservation/Space1/').valueChanges().subscribe(
      space1 => space1.forEach(item => {
        this.space1 = item;
        if (this.searchForReservation.date == this.space1.date && this.time == this.space1.time) {
          this.count += 1;
        }
        else 
          this.availableList.push(new MakerspaceSpace("Space1", 4, "Woodward 334", this.time, this.searchForReservation.date);

       
      }));

    this.SpaceSubscription = this.angularFire.list('/Reservation/Space2/').valueChanges().subscribe(
      space2 => space2.forEach(item => {
        this.space2 = item;
        if (this.searchForReservation.date == this.space2.date && this.time == this.space2.time) {
          this.count += 1;
        }
        else
          this.availableList.push(new MakerspaceSpace("Space2", 5, "Woodward 334", this.time, this.searchForReservation.date);
      }));
    this.SpaceSubscription = this.angularFire.list('/Reservation/Space3/').valueChanges().subscribe(
      space3 => space3.forEach(item => {
        this.space3 = item;
        if (this.searchForReservation.date == this.space3.date && this.time == this.space3.time) {
          this.count += 1;

        }
        else
          this.availableList.push(new MakerspaceSpace("Space3", 2, "Woodward 334", this.time, this.searchForReservation.date);
      }));

    this.SpaceSubscription = this.angularFire.list('/Reservation/Space4/').valueChanges().subscribe(
      space4 => space4.forEach(item => {
        this.space4 = item;
        if (this.searchForReservation.date == this.space4.date && this.time == this.space4.time) {
          this.count += 1;
        }
        else
          this.availableList.push(new MakerspaceSpace("Space4", 4, "Woodward 334", this.time, this.searchForReservation.date);
      
        console.log(this.count);
        if (this.count == 4) {
          this.noRooms = "no rooms are available at this time";
        }
        else {

          this.availableList = this.availableList.filter((elem, index, self) => self.findIndex(
            (t) => { return (t.space === elem.space && t.location === elem.location && t.capacity === elem.capacity && t.time === elem.time && t.date === elem.date) }) === index)
          this.availableRooms = this.availableList;


          console.log(this.availableList);

        }
      }));

   
  }
}

