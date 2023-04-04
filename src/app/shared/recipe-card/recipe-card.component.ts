import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Recipe } from 'src/app/models/recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';
import { Router } from '@angular/router';
import { take } from 'rxjs';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss']
})
export class RecipeCardComponent implements OnInit, OnDestroy {

 @Input() pag: string;

 @Output() messaggio = new EventEmitter();

 page = 1;
 ricettePerPagina = 4;
 recipes: Recipe[];
 ricetteTotali: number;

 constructor(
  private recipeService: RecipeService,
  private router: Router
  ) {}

 ngOnInit(): void {
    this.prendiRicette();
      // this.cardHome();
  }

  ngOnDestroy(): void {
    console.log('utente uscito dal componente')
  }

  prendiRicette(){
    this.recipeService.getRecipes().pipe(take(1)).subscribe({
      next: (res) => {
        this.recipes = res;
        this.ricetteTotali = res.length;
        if(this.pag){
          this.recipes = this.recipes.sort((a, b) => b._id - a._id).slice(0, 4);
        }
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

 inviaTitolo(titolo: string){
  this.messaggio.emit(titolo);
 }

 paginate(event){
  event.page = event.page +1;
  this.page = event.page;
 }

//  cardHome() {
//   const currentRoute = this.router.url;
//   if (currentRoute === '/home') {
//     this.prendiRicetteHome();
//   } else {
//     this.prendiRicette();
//   }
// }

// prendiRicetteHome() {
//   this.recipeService.getRecipes().subscribe({
//     next: (response) => {
//       this.recipes = response;
//       this.recipes = this.recipes.sort((a, b) => b._id - a._id).slice(0, 4);
//     },
//     error: (error) => {
//       console.log(error);
//     }
//   })
// }
}
