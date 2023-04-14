
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoggedInGuard } from 'src/app/logged-in.guard';

import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegistrationComponent } from './registration/registration.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {path: '', component: UserComponent, children: [
    {path: 'registrazione', component: RegistrationComponent},
    {path: 'login', component: LoginComponent},
    {path: 'profilo', component: ProfileComponent, canActivate: [LoggedInGuard]},
    {path: '', pathMatch: 'full', component: LoginComponent}
]},
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class UserRoutingModule {}
