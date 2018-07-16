import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'ngx-main',
  templateUrl: './main.component.html',
})
export class MainComponent implements OnInit {

  images: Array<string>;

  constructor() {
  }

  ngOnInit() {
    this.images = [
      '../../../assets/f1.JPG',
      '../../../assets/f2.JPG',
      '../../../assets/f3.JPG',
    ]
  }

}
