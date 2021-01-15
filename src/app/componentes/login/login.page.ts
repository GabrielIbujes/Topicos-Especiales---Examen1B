import { Component, OnInit } from '@angular/core';
import {  AuthService} from "../../servicios/auth.service";
import { Route, Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string;
  password:string;

  constructor(private authService:AuthService, public router: Router) { }

  ngOnInit() {
  }

  onSubmitLogin(){
    this.authService.login(this.email, this.password).then(res=>{
        this.router.navigate(['/home']);
    }).catch(err=>alert('La información proporcionada es incorrecta, o no existe el usuario'))
  }

  registro(){
    console.log("usuario registrado");
    this.router.navigate(['/registro']);
  }

}
