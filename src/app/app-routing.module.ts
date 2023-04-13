import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { RegistrationComponent } from './components/user/registration/registration.component';
import { EsempioCombineComponent } from './components/esempio-combine/esempio-combine.component';
import { LoginComponent } from './components/user/login/login.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { LoggedInGuard } from './logged-in.guard';


const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'registrazione', component: RegistrationComponent},
  {path: 'login', component: LoginComponent},
  {path: 'profilo', component: ProfileComponent, canActivate: [LoggedInGuard]},
  {path: 'combine', component: EsempioCombineComponent},
  {path: 'ricette', loadChildren: () => import("./components/recipes/recipes.module").then(modulo => modulo.RecipesModule)},
  {path: '**', redirectTo: 'home'} //va sempre in chiusura, se non viene trovato il percorso digitato riporta in home
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
