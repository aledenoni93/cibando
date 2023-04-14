import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';

import { EsempioCombineComponent } from './components/esempio-combine/esempio-combine.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'combine', component: EsempioCombineComponent},
  {path: 'ricette', loadChildren: () => import("./components/recipes/recipes.module").then(modulo => modulo.RecipesModule)},
  {path: 'user', loadChildren: () => import("./components/user/user.module").then(modulo => modulo.UserModule)},
  {path: '**', redirectTo: 'home'} //va sempre in chiusura, se non viene trovato il percorso digitato riporta in home
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
