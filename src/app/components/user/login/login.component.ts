import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService]
})
export class LoginComponent {
  loginError: string;
  user: any;

  constructor(
    private router: Router,
    private authService: AuthService,
    private messageService: MessageService
    ) {}

    onSubmit(credentials: any){
      if(credentials.email != '' && credentials.password != ''){
        this.authService.login(credentials.email, credentials.password).subscribe({
          next: (res) => {
            this.user = res;
            if(res) {
              this.authService.saveStorage(res);
              this.router.navigate(['home']);
            } else{
              this.loginError = 'Email o password errati';
              this.messageService.add({severity: 'error', summary: 'ERRORE!', detail: 'Il login non è andato a buon fine', life: 3000})
            }
          },
          error: (err) => {
            console.log(err);
            this.loginError = 'Email o password errati';
            this.messageService.add({severity: 'error', summary: 'ERRORE!', detail: 'Il login non è andato a buon fine', life: 3000})
          }
        })
      }
    }

}
