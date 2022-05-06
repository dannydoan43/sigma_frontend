import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../authentication.service';
import { SignupRequest } from './signup-request';
import { LoginValidatorDirective } from 'src/app/shared/validators/login-validator.directive';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
//formbuilder?
  signupRequest:SignupRequest;
  signupForm: FormGroup = this.fb.group({});
  constructor(private authService: AuthenticationService, private router: Router,private fb:FormBuilder) { 
    this.signupRequest= {
      username:'',
      email:'',
      password:'',
      firstName:'',
      lastName:''
    };
  }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      username: ['',[Validators.required]],
      email: ['',[Validators.required,Validators.email]],
      password: ['',[Validators.required]],
      firstName: ['',[Validators.required,LoginValidatorDirective.validateName]],
      lastName: ['',[Validators.required,LoginValidatorDirective.validateName]]   //just added in the directive stuff
      //signupForm.controls.firstName.dirty      signupForm.controls.firstName.hasError('namePatternError')
    })
  }

  signup(){
    this.signupRequest.email = this.signupForm.get('email')?.value;
    this.signupRequest.username = this.signupForm.get('username')?.value;
    this.signupRequest.password = this.signupForm.get('password')?.value;
    this.signupRequest.firstName = this.signupForm.get('firstName')?.value;
    this.signupRequest.lastName = this.signupForm.get('lastName')?.value;

    this.authService.signup(this.signupRequest).subscribe( {
      next : (v) => {       //route to login
        this.router.navigateByUrl('login')
        console.log(v);
      }, error : (e) => {
        console.log(e);
      }
    })
  }


}
