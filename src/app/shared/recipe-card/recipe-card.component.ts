import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Recipe } from 'src/app/models/recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';
import { Router } from '@angular/router';
import { Observable, map, take } from 'rxjs';
import { MessageService } from 'primeng/api';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss'],
  providers: [MessageService]
})
export class RecipeCardComponent implements OnInit, OnDestroy {

 @Input() pag: string;

 @Output() messaggio = new EventEmitter();

 page = 1;
 ricettePerPagina = 4;
 ricetteTotali: number;
 recipes: Recipe[];
 loading= true;

 ruolo: any

//   recipes$: Observable<Recipe[]> = this.recipeService.getRecipes().pipe(
//   map(response => response.filter(ricetteFiltrate => ricetteFiltrate.difficulty < 3)),
//   map(res => this.ricette = res)
//   );
//   ricette: Recipe[];


  constructor(
  private recipeService: RecipeService,
  private router: Router,
  private userService: UserService,
  private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.prendiRicette();
      // this.cardHome();
      if(JSON.parse(localStorage.getItem('user')) !== null){
        this.userService.userRole.subscribe({
          next: res => this.ruolo = res
        })
      }
  }

  ngOnDestroy(): void {
    console.log('utente uscito dal componente')
  }

  prendiRicette(){
    this.recipeService.getRecipes().pipe(take(1)).subscribe({
      next: (res) => {
        this.loading = false;
        this.recipes = res;
        this.ricetteTotali = res.length;
        if(this.pag){
          this.recipes = this.recipes.sort((a, b) => b._id - a._id).slice(0, 4);
        }
        if(res){
          this.messageService.add({severity: 'success', summary:'Completato', detail: 'Ricette caricate correttamente', life: 3000})
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
