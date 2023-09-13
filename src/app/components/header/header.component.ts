import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  title: string = 'Task Tracker';

  currentPath: string;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {

    // if (typeof NgZone !== 'undefined') {
    //   console.log('Header Angular Component');
    // } else {
    //   console.log('Header Non Angular Component');
    // }

    // this.currentPath = this.router.url;
    // console.log('path', this.currentPath);
    // console.log('weird');

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentPath = this.getFullRouteURL(this.route.root);
        // console.log('path', this.currentPath);
      }
    });
  }
  private getFullRouteURL(route: ActivatedRoute): string {
    let url = '';
    while (route.firstChild) {
      route = route.firstChild;
      url += '/' + route.snapshot.url.map((segment) => segment.path).join('/');
    }
    return url;
  }
}
