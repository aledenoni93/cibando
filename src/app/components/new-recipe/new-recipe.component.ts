import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RecipeService } from 'src/app/services/recipe.service';
import { Recipe } from 'src/app/models/recipe.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-new-recipe',
  templateUrl: './new-recipe.component.html',
  styleUrls: ['./new-recipe.component.scss'],
  providers: [MessageService]
})
export class NewRecipeComponent implements OnInit {
  recipe: any;
  ricettaInserita: any;

  title: string;
  description: string;
  image: string;
  published: boolean;
  difficulty: number;

  form = new FormGroup({
    title : new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    image: new FormControl('', Validators.required),
    published: new FormControl(false),
    difficulty: new FormControl('', [Validators.required, Validators.min(1), Validators.max(5)]),
  })

  constructor(
    private recipeService: RecipeService,
    private modalService: NgbModal,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(){
    this.prendiDatiRicetta();
  }

  aggiungiRicette(){
    const recipe = this.form.value
    this.recipeService.insertRecipe(recipe).pipe(take(1)).subscribe({
      next: (res) => {
      console.log('response is ', res)
      this.ricettaInserita = res;
      this.messageService.add({severity: 'success', summary: 'Successo!', detail: 'La ricetta è stata caricata con successo', life: 3000})
    },
      error: (err) => {
        console.log(err)
        this.messageService.add({severity: 'error', summary: 'ERRORE!', detail: 'Il caricamento della ricetta non è andato a buon fine', life: 3000})
      }
    })
    this.recipeService.datiRicetta.next(recipe);
  }

  openModal(content: any, titolo?: string){
    let title = titolo;

    this.modalService.open(content, {ariaLabelledBy: 'modale servizi', size: 'lg', centered: true}).result.then((res) => {
      console.log('azione da eseguire' + titolo)
    }).catch((res) => {
      console.log('nessuna azione da eseguire')
    })
}

  prendiDatiRicetta(){
    this.recipeService.datiRicetta.subscribe((res: any) => {
      this.title = res.title;
      this.description = res.description;
      this.image = res.image;
      this.published = res.published;
      this.difficulty = res.difficulty;
    })
  }

  onClose(){
    this.ricettaInserita = '';
    this.router.navigate(['ricette'])
  }

  onNewRecipe(){
    this.ricettaInserita = '';
    this.form.patchValue({
      title : '',
      description : '',
      image : '',
      published : false,
      difficulty : null,
    })
  }

  open(content: any, titolo?: string){
    let title = titolo;
    this.modalService.open(content, {ariaLabelledBy: 'modale ricette', size: 'lg', centered: true}).result.then((res) => {
      this.onClose();
    }).catch((res) => {
      this.onNewRecipe();
    })
  }

  svuotaCampi(){
    this.recipeService.datiRicetta.subscribe((res: any) => {
      res.title = '';
      res.description = '';
      res.image = '';
      res.published = false;
      res.difficulty = null;
    })
  }
}
