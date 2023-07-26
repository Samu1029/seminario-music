import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticateService } from '../services/authenticate.service';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  
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
    ]
  }

  errorMessage: string = '';

  constructor(
    private formBuilder: FormBuilder, 
    private authService: AuthenticateService,
    private navCtrl: NavController,
    private storage: Storage,
    private alertCtrl: AlertController
    ) {
    this.loginForm = this.formBuilder.group(
      {
        email: new FormControl(
          "",
          Validators.compose(
            [
              Validators.required,
              Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9_.+-]+.[a-zA-Z0-9.-]+$"),
              Validators.email //Se agrega validators
            ]
          )
        ),
        password: new FormControl(
          "",
          Validators.compose(
            [
              Validators.required,
              Validators.minLength(6),
              Validators.maxLength(25)//Se agrega validators
            ]
          )
        )
      }
    )
  }

  ngOnInit() {
  }

  loginUser(credentials: any) {
    console.log(credentials);
    this.authService.loginUser(credentials).then((res: any) => {
      this.errorMessage = "";
      this.storage.set("isUserLoggedIn", true);
      this.storage.set("user_id", res.id);
      this.navCtrl.navigateForward("/menu/home");
    }).catch(err => {
      this.errorMessage = err;
      console.log(this.errorMessage);
      this.presentAlert("Opps", "Error de Login", "Verifique sus credenciales")
    })
  }

  async presentAlert(header: string, subHeader:string, message:string){
    const alert = await this.alertCtrl.create({
      header: header,
      subHeader: subHeader,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  goToRegister() {
    this.navCtrl.navigateForward("/register");
  }

}
