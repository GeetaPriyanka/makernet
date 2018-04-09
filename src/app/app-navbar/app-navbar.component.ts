import { Component, OnInit, ElementRef, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { DataService } from '../data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './app-navbar.component.html',
  styleUrls: ['./app-navbar.component.css']
})
export class AppNavbarComponent implements OnInit {

  constructor(private el: ElementRef, private ds: DataService) { }

  spacerHeight: string;

  @HostListener('window:resize') 
  onResize() {
    this.resizeSpacer();
  }

  ngOnInit() {
    this.resizeSpacer();
  }

  logout() {
    this.ds.logout();
  }

  private resizeSpacer() {
    let nav: HTMLElement = this.el.nativeElement;
    let mainNav = nav.getElementsByClassName('mainNav')[0] as HTMLElement;
    this.spacerHeight = mainNav.clientHeight.toString() + 'px';
  }
  



}
