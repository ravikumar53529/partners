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
    });
  }
  //Reactive form validations
  get userName() {
    return this.loginForm.get('username');
  }
  get userPassword() {
    return this.loginForm.get('password');
  }
  //user authentication
  getUserLoginDetails(): void {
    this.registeredUsers.filter((users) => {
      console.log(users);
    });
    for (let users of this.registeredUsers) {
      if (
        users.username === this.loginForm.value['username'] &&
        users.password === this.loginForm.value['password']
      ) {
        Swal.fire('success');
        this.userAuthentication = true;
        this.partnersServiceRef.userauthentication(this.userAuthentication);
        this.routerRef.navigate(['/partners']);
        break;
      } else {
        Swal.fire('user', 'Login Failed', 'error');
      }
    }
    this.loginForm.reset();
  }
}
