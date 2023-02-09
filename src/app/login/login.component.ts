import { Component, OnInit } from '@angular/core';
import { PartnersServiceService } from '../services/partners-service.service';
import { User } from '../interfaces/user';
import {
  FormGroup,
  FormControl,
  FormControlName,
  Validators,
} from '@angular/forms';
import Swal from 'sweetalert2';
import { Logindata } from '../interfaces/logindata';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  registeredUsers: User[] = [];
  userAuthentication: boolean = false;

  //loginform
  loginForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.pattern('^[a-zA-Z]+$'),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.pattern('^[a-zA-Z0-9]+$'),
    ]),
  });
  constructor(
    private partnersServiceRef: PartnersServiceService,
    private routerRef: Router
  ) {}
  ngOnInit(): void {
    this.partnersServiceRef.getCredential().subscribe((data) => {
      this.registeredUsers = data;
      console.log(this.registeredUsers);
    });
  }
  //Reactive form validations
  get userName() {
    return this.loginForm.get('username');
  }
  get userPassword() {
    return this.loginForm.get('password');
  }
  //getUserLoginDetails
  getUserLoginDetails(): void {
    for (let i = 0; i < this.registeredUsers.length; i++) {
      console.log(this.loginForm.value['username']);
      console.log(this.registeredUsers[i].username);
      if (
        this.loginForm.value['username'] === this.registeredUsers[i].username &&
        this.loginForm.value['password'] === this.registeredUsers[i].password
      ) {
        Swal.fire('success');
        this.loginForm.reset();
        this.routerRef.navigate(['/partners']);
        break;
      } else {
        Swal.fire('user', 'Login Failed', 'error');
        this.loginForm.reset();
      }
    }
  }
}
