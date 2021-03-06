import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  activeNavBar: any;

  constructor() { }

  ngOnInit(): void {
  }

  toggleNavBar(): void {
    if (this.activeNavBar == 'none' || this.activeNavBar == undefined) {
      this.activeNavBar = 'block';
      
    } else if (this.activeNavBar == 'block' || this.activeNavBar == undefined) {
      this.activeNavBar = 'none'
      
    }
  }

  checksize(event: any): void {
    let wh = event.srcElement.innerWidth;
    if (wh > 800) {
      
      this.activeNavBar = 'flex';
    } else {
      
      this.activeNavBar = 'none'
    }
  }

}
