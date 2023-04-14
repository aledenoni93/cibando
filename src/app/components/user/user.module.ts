import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';
import { ToastModule} from 'primeng/toast';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { MaterialExampleModule } from 'src/material.module';
import { UserRoutingModule } from "./user-routing.module";

import { LoginComponent } from "./login/login.component";
import { ProfileComponent } from "./profile/profile.component";
import { RegistrationComponent } from "./registration/registration.component";
import { UserComponent } from './user/user.component';

@NgModule({
  declarations: [
   LoginComponent,
   ProfileComponent,
   RegistrationComponent,
   UserComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    PasswordModule,
    DividerModule,
    ToastModule,
    CKEditorModule,
    MaterialExampleModule,
    UserRoutingModule
  ],
  exports: [
  ]
})

export class UserModule {}
