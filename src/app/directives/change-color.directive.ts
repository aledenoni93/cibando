import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appChangeColor]'
})
export class ChangeColorDirective {

@HostBinding('style.backgroud-color') background: string;
@HostBinding('style.color') color: string;

coloriSfondo = ['red', 'orange', 'darkred']
coloriTesto = ['white', 'black', 'grey']

@HostListener('keydown') nuovoColore(){
  const coloreBackGround = Math.floor(Math.random() * this.coloriSfondo.length)
  const coloreTesto = Math.floor(Math.random() * this.coloriTesto.length)

  this.background = this.coloriSfondo[coloreBackGround];
  this.color = this.coloriTesto[coloreTesto];
}
  constructor() { }

}
