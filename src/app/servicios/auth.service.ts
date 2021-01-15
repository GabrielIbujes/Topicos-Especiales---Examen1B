import { Injectable } from '@angular/core';
import {AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from "@angular/fire/firestore";
import { rejects } from 'assert';
import { Router } from "@angular/router";
import { resolve } from 'dns';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private AFauth:AngularFireAuth, private router: Router, private db:AngularFirestore) { }

  login(email:string, password:string){
    return new Promise((resolve,rejected)=>{
      this.AFauth.signInWithEmailAndPassword(email,password).then(user=>{
        resolve(user);
      }).catch(err=> rejected(err));

    });
  }


  logout(){
    this.AFauth.signOut().then(()=>{
      this.router.navigate(['/login']);
    })

  }

  crearUsuario(email:string, password:string){
    return new Promise((resolve,rejected)=>{
      this.AFauth.createUserWithEmailAndPassword(email,password).then(user =>{
        resolve(user);
        const uid = user.user.uid;
        console.log('comprobando.. '+uid);
      }).catch(err =>rejected(err))
    })

  }

}
