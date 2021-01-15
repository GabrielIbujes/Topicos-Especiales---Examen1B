import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from "@angular/fire/firestore";
import { Router } from '@angular/router';
import { AuthService } from "src/app/servicios/auth.service";


interface usuario{
  email:string,
  password:string
}


@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  email:string;
  password:string;
  user:usuario;

  constructor(private auth:AngularFireAuth, private router:Router, private db:AngularFirestore, private authf:AngularFireAuth) { }

  ngOnInit() {
    this.user={
      email:'',
      password:''
    }
  }


  registro(){
    console.log(this.email);
    if(this.email== undefined || this.password ==undefined ){
      alert('debes llenar obligatoriamente estos campos')
    } else{
      console.log('comprobando...')
      this.auth.createUserWithEmailAndPassword(this.email, this.password).then(res =>{
        console.log('Usuario registrado');
        console.log(res.user.uid);
        this.user.email = this.email;
        this.user.password = this.password;
        this.db.collection('usuarios').doc(res.user.uid).set(this.user).then(()=>{
          this.router.navigate(['/login']);
          alert('Usuario Registrado')  
        });
      })
    }
  }


  volver() {
    console.log('Inicia Sesión porfavor');
    this.router.navigate(['/login']);
  }


}
