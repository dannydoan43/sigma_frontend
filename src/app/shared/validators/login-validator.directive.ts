import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[appLoginValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: LoginValidatorDirective,
    multi: true
  }]
})
export class LoginValidatorDirective {

  static validateName(control:AbstractControl):any {
    let pattern1 : RegExp = /^[a-zA-Z ]+/;
    let pattern2 : RegExp = /^[^ ].*/;
    let pattern3 : RegExp = /.*[^ ]$/;
    let value = control.value;
    let matches: boolean = pattern1.test(value) && pattern2.test(value) && pattern3.test(value);

    if(!matches) {
      return {"namePatternError":true}  //this is what you call in the html for it to show
    }
    return null;
  }

  static validatePassword(control:AbstractControl):any {
    let pattern1 : RegExp = /^.*[A-Z]+.*/;
    let pattern2 : RegExp = /^.*[a-z]+.*/;
    let pattern3 : RegExp = /.*[\d]+.*/;
    let pattern4 : RegExp = /.*[@#$%&*^]+.*/;
    let value=control.value;
    let matches:boolean = pattern1.test(value) && pattern2.test(value) && pattern3.test(value) && pattern4.test(value);

    if(!matches) {
      return {"passwordPatternError":true}
    }
    return null;
  }

  static confirmPassword(passwordControl:AbstractControl):any {
    return (confirmPasswordControl:AbstractControl)=>{
      if(passwordControl.value != confirmPasswordControl.value){
        return {'confirmPassword':true}
      }
      return null;
    }
  }
}
