import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { DataService } from '../data.service';
import { MakerspaceUser } from '../models/makerspace-user';
import { MakerspaceEvent } from '../models/makerspace-event';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  constructor() { }

  

  ngOnInit() {
  }

  ngOnDestroy() {
  }

}
