import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

  images = [
    {id : 1,
    label : "Spaghetti al pomodoro"},
    {id : 2,
      label : "tagliata di manzo"},
    {id : 3,
      label : "Tiramisù"},
  ];

  percorso = "../assets/images/carousel-";

  ngOnInit(): void {
    
  }
}
