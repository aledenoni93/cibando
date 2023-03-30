import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {

  form = new FormGroup({
    name : new FormControl('', Validators.required),
    email : new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    ripetiPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
    accetto: new FormControl('', Validators.requiredTrue)
  })

  onSubmit(){
    console.log(this.form.value);
  }

}
