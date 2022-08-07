import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgControl, FormControl, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { User } from '../models/user.model';
import { RegistrationValidatorService } from '../services/registration-validator.service';

// http://localhost:3000/composer/metadata/40:154627?view=grid&user=12

@Component({
  selector: 'app-reg-form',
  templateUrl: './reg-form.component.html',
  styleUrls: ['./reg-form.component.css']
})
export class RegFormComponent implements OnInit {
  public userInput: any;
  public userForm: any;
  constructor() {
    this.userForm = new FormGroup(this.userInput = new RegUser(), this.pwdMatch("Password", "RePassword"));
  }

  ngOnInit(): void {

  }
  onSubmit(){

  }
  pwdMatch(pwd:string, repwd:string): ValidatorFn{
    return (control: AbstractControl): ValidationErrors | null => {
      const sourceCtrl = control.get(pwd);
      const targetCtrl = control.get(repwd);

      return sourceCtrl && targetCtrl && sourceCtrl.value !== targetCtrl.value
        ? { mismatch: true }
        : { mismatch: false };
    };
  }
}
export class RegUser{
  constructor(
    public FirstName: FormControl = new FormControl("", [Validators.required, Validators.pattern(/^[A-Za-z\s]+$/)]),
    public LastName: FormControl = new FormControl("", [Validators.required, Validators.pattern(/^[A-Za-z\s]+$/)]),
    public Email: FormControl = new FormControl("", [Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)]),
    public Password: FormControl = new FormControl("", [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*\d)(?=.*[a-z])[a-z\d]{2,}$/i)]),
    public RePassword: FormControl = new FormControl("", [Validators.required])){}
}
export class ErrCtrl{
  constructor(
    public fn_err: string,
    public ln_err: string,
    public em_err: string,
    public pwd_err: string,
    public repwd_err: string
  ){}
}
