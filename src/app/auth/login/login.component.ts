import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { LoginRequest } from './login-request';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup=this.fb.group({});
  loginRequest:LoginRequest;
  successMessage:string='';
  isError:boolean=false;

  constructor(private fb: FormBuilder,private authService:AuthenticationService,private route: Router) { 
    this.loginRequest = {
      username:'',
      password:''
    };
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['',[Validators.required]],
      password: ['',[Validators.required]]
    });
  }

  login() {
    this.loginRequest.username = this.loginForm.get('username')?.value;
    this.loginRequest.password = this.loginForm.get('password')?.value;

    this.authService.login(this.loginRequest).subscribe({
      next:(v) => {
        this.isError=false;
        console.log(v);
        this.route.navigateByUrl('home').then(()=> {window.location.reload();});
      },
      error: (e) => {
        this.isError=true;
        console.log(e);
      }
    });
  }
}
