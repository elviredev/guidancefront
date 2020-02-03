import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  BASE_URL: string = 'http://localhost:8080';
  jwt: string;
  roles: Array<string>;
  user: User;

  constructor(private httpClient: HttpClient) { }

  login(data) {
    // récupère l'entête Authorization grace à l'option {observe: response} => on ne convertit plus en json
    // on veut toute la réponse http et après on récupère ce qu'on veut dans la réponse
    return this.httpClient.post(`${this.BASE_URL}/login`, data, { observe: 'response' });
  }

  saveToken(jwt: string) {
    // enregistrer token dans LocalStorage
    localStorage.setItem('token', jwt);
    // placer le jwt dans le context de l'application
    this.jwt = jwt;
    // à partir du jwt, récupérer id, username et roles
    this.parseJWT();
  }

  // a partir de jwt je récupère un user et les roles
  // library => npm install @auth0/angular-jwt
  parseJWT() {
    const jwtHelper = new JwtHelperService();
    const decodedToken = jwtHelper.decodeToken(this.jwt);
    console.log('decodedToken');
    console.log(decodedToken);
    this.roles = decodedToken.roles;
    // je créé un objet user avec un id, username décodés le reste à null car pas besoin
    this.user = {id: decodedToken.id, username: decodedToken.username, password: null, activated: null, _links: null};
  }

  // si chaine ADMIN est >= 0 c'est un ADMIN
  isAdmin() {
    return this.roles.indexOf('ADMIN') >= 0;
  }

  // si chaine USER est >= 0 c'est un USER
  isUser() {
    return this.roles.indexOf('USER') >= 0;
  }

  // utilisateur est authentifié quand user existe
  isAuthenticated() {
    return !(this.user === undefined);
  }

  // récupère le token au demarrage de la page principale si authentifié => plus besoin de s'authentifier à chaque fois
  loadToken() {
   this.jwt = localStorage.getItem('token');
   if (this.jwt != null) {
     this.parseJWT();
   }
  }

  logOut() {
    localStorage.removeItem('token');
    this.initParams();
  }

  initParams() {
    this.jwt = undefined;
    this.user = undefined;
    this.roles = undefined;
  }

  register(credentials) {
    console.log('register', credentials);
    return this.httpClient.post(`${this.BASE_URL}/adminUsers`, credentials, { observe: 'response' });
  }

}
