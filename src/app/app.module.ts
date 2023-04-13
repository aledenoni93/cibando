import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialExampleModule } from 'src/material.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';
import { ToastModule} from 'primeng/toast';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { RecipesModule } from './components/recipes/recipes.module';

import { CarouselComponent } from './components/carousel/carousel.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { RegistrationComponent } from './components/user/registration/registration.component';
import { ChangeColorDirective } from './directives/change-color.directive';
import { EsempioCombineComponent } from './components/esempio-combine/esempio-combine.component';
import { LoginComponent } from './components/user/login/login.component';
import { ProfileComponent } from './components/user/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    CarouselComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    RegistrationComponent,
    ChangeColorDirective,
    EsempioCombineComponent,
    LoginComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialExampleModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    PasswordModule,
    DividerModule,
    HttpClientModule,
    ToastModule,
    CKEditorModule,
    RecipesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
