import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // errorFromServer = '';
  errorMsg = '';

  @ViewChild('formlogin', {static: false}) form: any;

  constructor(private authService: AuthenticationService, private router: Router) { }

  ngOnInit() {
    this.authService.loadToken();
  }

  onLogin(data) {
    console.log(data);
    this.authService.login(data)
        .subscribe(resp => {
          console.log(resp);
          console.log('Header ' + resp.headers.get('Authorization'));
          let jwt = resp.headers.get('Authorization');
          this.authService.saveToken(jwt);
          this.router.navigateByUrl('/');
        }, err => {
          console.log('erreur serveur : ');
          console.log(err.message);
          // this.errorFromServer = `Error ${err.message} - ${err.status}`;
          this.errorMsg = 'Identifiants incorrects, veuillez re-saisir identifiant et mot de passe';
          this.form.reset();
        });
  }

  isAdmin() {
    return this.authService.isAdmin();
  }

  isUser() {
    return this.authService.isUser();
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }

  logOut() {
    return this.authService.logOut();
  }

}
