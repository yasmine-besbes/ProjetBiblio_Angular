import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { ServicesService } from '../services.service';
import { NgIf } from '@angular/common';
declare var Swal:any;
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  error:string='';
  loginForm:any;
  signUpForm:any;
  constructor(private http:HttpClient,private router:Router,private fb:FormBuilder,private serv:ServicesService){
   
  }
  ngOnInit(): void {
    this.loginForm=this.fb.group({
      Login:new FormControl('',[Validators.required,Validators.email]),
      Pass:new FormControl('',Validators.required)
    });
    this.signUpForm=this.fb.group({
      Nom:new FormControl('',Validators.required),
      Prenom:new FormControl('',Validators.required),
      Mail:new FormControl('',[Validators.required,Validators.email]),
      Login:new FormControl('',[Validators.required,Validators.email]),
      Pass:new FormControl('',Validators.required),
      Role:new FormControl('User',Validators.required)

    })
  }
  signUp(){
    console.log(this.signUpForm.value);
    const signUpData = { ...this.signUpForm.value, action: 'signup' };
    this.serv.signUp(signUpData).subscribe({
      next: (response) => {
        console.log(response);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Utilisateur ajouté avec succes!",
          showConfirmButton: false,
          timer: 1500
        });
       
      },
      error: (erreur) => {
        console.error('Erreur d\'inscription :', erreur);
        Swal.fire({
          position: "center",
          icon: "error",
          title: erreur.error['erreur'],
          showConfirmButton: false,
          timer: 1500
        });
        
      }
    });
  }
  login() {
    console.log(this.loginForm.value);
    this.serv.login(this.loginForm.value).subscribe({
      next: (response) => {
        localStorage.setItem('LoggedUser',JSON.stringify(response));
        if (response.Role === 'Agent') {
          this.router.navigateByUrl('/gestion');
        } else if (response.Role === 'User') {
          this.router.navigateByUrl('/search');
        } 
      },
      error: (error) => {
        console.error('Erreur de connexion:', error);
        Swal.fire({
          icon:"error",
          title:"Oops...",
          text:error.error['erreur'],
        });
      }
    });
  }
 /* login(){
    this.router.navigateByUrl("/gestion");
  }*/

}
