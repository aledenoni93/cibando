import { Component } from '@angular/core';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'cibando';


  colore = 'rosso';

  coloreScelto ='';

  cambiaBG(){
    this.colore = this.coloreScelto;
  }

  

}
