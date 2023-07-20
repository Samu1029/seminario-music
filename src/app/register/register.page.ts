import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthenticateService } from '../services/authenticate.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  
  registerForm: FormGroup;

  validation_messages = {
    email: [
      { type: "required", message: "El email es obligatorio" },
      { type: "pattern", message: "Digite un email válido" },
      { type: "email", message: "Ej. name@example.com" }
    ],
    password: [
      { type: "required", message: "La Contraseña es obligatoria" },
      { type: "minlength", message: "El mínimo de caracteres es 8... Verifique!!" },
      { type: "maxlength", message: "El máximo de caracteres es 16... Verifique!!" }
    ],
    name: [
      { type: "required", message: "El Nombre es obligatorio" }
    ],
    last_name: [
      { type: "required", message: "Los Apellidos son obligatorio" }
    ],
  }

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticateService,
    private navCtrl: NavController
  ) {
    this.registerForm = this.formBuilder.group(
      {
        email: new FormControl(
          "",
          Validators.compose(
            [
              Validators.required,
              Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9_.+-]+.[a-zA-Z0-9.-]+$")
          ]
          )
        ),
        password: new FormControl(
          "",
          Validators.compose(
            [
              Validators.required,
              Validators.minLength(6),
              Validators.maxLength(25)
            ]
          )
        ),
        name: new FormControl(
          "",
          Validators.compose(
            [
              Validators.required
            ]
          )
        ),
        last_name: new FormControl(
          "",
          Validators.compose(
            [
              Validators.required
            ]
          )
        )
      }
    )
  }

  ngOnInit() {
  }
  
  goToLogin(){
    console.log("Volver atras");
    this.navCtrl.navigateBack('/login');
  }

  registerUser(userData: any) {
    console.log(userData);
    this.authService.registerUser(userData).then(() => {
      this.navCtrl.navigateBack('/login');
    })
  }

}
