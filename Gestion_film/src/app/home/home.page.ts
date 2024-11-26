import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  slideOpts = {
    initialSlide: 0,      // The initial slide to display
    speed: 400,           // Transition speed in ms
    autoplay: true,       // Autoplay the slides
    loop: true,           // Loop through the slides
    pagination: {
      el: '.swiper-pagination', // Enable pagination controls
      clickable: true,          // Allow clicking the pagination dots
    },
  };

  constructor() {}

}
