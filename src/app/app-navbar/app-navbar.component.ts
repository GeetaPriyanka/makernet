import { Component, OnInit, ElementRef, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-navbar',
  templateUrl: './app-navbar.component.html',
  styleUrls: ['./app-navbar.component.css']
})
export class AppNavbarComponent implements OnInit {

  constructor(public afAuth: AngularFireAuth, private router: Router, public db: AngularFireDatabase, private el: ElementRef) { }

  spacerHeight: string;

  @HostListener('window:resize') 
  onResize() {
    this.resizeSpacer();
  }

  ngOnInit() {
    this.resizeSpacer();
  }

  logout() {
    this.afAuth.auth.signOut().then(
      (success) => {
        this.router.navigate(['/login']);
      }).catch(
      (err) => {
        //this.error = err;
      })
  }

  private resizeSpacer() {
    let nav: HTMLElement = this.el.nativeElement;
    let mainNav = nav.getElementsByClassName('mainNav')[0] as HTMLElement;
    this.spacerHeight = mainNav.clientHeight.toString() + 'px';
  }
  



}
