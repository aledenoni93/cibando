import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomValidator } from '../customValidator';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { take } from 'rxjs';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {

  userInserito: any;

  name: string;
  email: string;
  password: string;


  constructor(
     private userService : UserService,
     private router : Router,
     private modalService: NgbModal,
     ) {}


    form = new FormGroup({
    name : new FormControl('', Validators.required),
    email : new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/)]),
    ripetiPassword: new FormControl('', Validators.required),
    accetto: new FormControl('', Validators.requiredTrue)
  },
  [CustomValidator.MatchValidator('password', 'ripetiPassword')]
  );

  ngOnInit(){
      this.prendiDatiUser;
  }

  aggiungiUser(){
    //console.log(this.form.value);
    const user = this.form.value
    this.userService.insertUser(user).pipe(take(1)).subscribe({
      next: (res) => {
        console.log('response is ', res)
        this.userInserito = res;
      },
      error: (err) =>{
        console.log(err)
      }
    })
    this.userService.datiUtente.next(user);
    this.router.navigate(['home']);
  }

  prendiDatiUser(){
    this.userService.datiUtente.subscribe((res: any) => {
      this.name = res.name;
      this.email = res.email;
      this.password = res.password;

    })
  }

  openModal(content: any, titolo?: string){ //content è sempre obbligatorio
      let title = titolo;

      this.modalService.open(content, {ariaLabelledBy: 'modale servizi', size: 'lg', centered: true}).result.then((res) => {
        console.log('azione da eseguire' + titolo)
      }).catch((res) => {
        console.log('nessuna azione da eseguire')
      })
  }

}
