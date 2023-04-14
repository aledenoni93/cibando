import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Recipe } from 'src/app/models/recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';
import { Router } from '@angular/router';
import { Observable, map, take } from 'rxjs';
import { MessageService } from 'primeng/api';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';

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
 ricercato: any;

 ruolo: string;

//   recipes$: Observable<Recipe[]> = this.recipeService.getRecipes().pipe(
//   map(response => response.filter(ricetteFiltrate => ricetteFiltrate.difficulty < 3)),
//   map(res => this.ricette = res)
//   );
//   ricette: Recipe[];


  constructor(
  private recipeService: RecipeService,
  private router: Router,
  private userService: UserService,
  private messageService: MessageService,
  public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.prendiRicette();
    if(JSON.parse(localStorage.getItem('user')) != null){
      const user=JSON.parse(localStorage.getItem('user'));
      this.onGetUser(user.email)
    }
  }

  ngOnDestroy(): void {
    console.log('utente uscito dal componente')
  }

  prendiRicette(){
    this.recipeService.getRecipes().pipe(take(1)).subscribe({
      next: (res) => {
        if(this.pag === 'ricerca') {
          this.recipeService.testoCercato.subscribe({
            next: (res) => {
              this.ricercato = res;
              if(this.ricercato) {
                this.recipeService.findRecipes(this.ricercato).subscribe({
                  next: (res) => {
                    this.loading = false;
                    this.recipes = res;
                    console.log(res);
                  },
                  error: (err) => {
                    console.log(err);
                  }
                })
              }
            },
            error: (err) => {
              console.error(err);
            }
          });
        }else{
        this.loading = false;
        this.recipes = res;
        this.ricetteTotali = res.length;
        if(this.pag != 'ricerca'){
          this.recipes = this.recipes.sort((a, b) => b._id - a._id).slice(0, 4);
        }
        if(res){
          this.messageService.add({severity: 'success', summary:'Completato', detail: 'Ricette caricate correttamente', life: 3000})
        }
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

 onGetUser(email): void{
  this.userService.getUser(email).pipe(take(1))
  .subscribe({
    next: res =>{
      this.ruolo=res.role;
    },
    error: err => console.log(err)
  })
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
