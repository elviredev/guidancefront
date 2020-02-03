import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs';
import { User } from '../models/User';
import { Role } from '../models/Role';
import { Roles } from '../models/Roles';
import { Applis } from '../models/Applis';


@Injectable({
  providedIn: 'root'
})
export class PortailService {
  public BASE_URL: string = 'http://localhost:8080';

  constructor(private httpClient: HttpClient, private authService: AuthenticationService) { }

  getBaseUrl(){
    return `${this.BASE_URL}`;
  }

  getAllApplis() {
    return this.httpClient.get<Applis>(`${this.BASE_URL}/applis`);
  }

  getAllUsers() {
    return this.httpClient.get(`${this.BASE_URL}/userApps`);
  }

  // récupérer n'importe quelle ressource par son url avec spring data rest
  getRessource(url) {
    return this.httpClient.get(url);
  }

  // récupérer le user de type USER via URL
  getUser(url): Observable<User> {
    return this.httpClient.get<User>(url);
  }

  getUserById(id): Observable<User> {
    console.log('id: ', id);
    return this.httpClient.get<User>(`${this.BASE_URL}/userApps/` + id);
  }

  getRoles() {
    return this.httpClient.get<Roles>(`${this.BASE_URL}/roleApps`);
  }

  getRoleByUser(user: User) {
    return this.httpClient.get<Roles>(`${this.BASE_URL}/userApps/` + user.id + '/roles');
  }

  getApplisByUser(user: User) {
    return this.httpClient.get<Applis>(`${this.BASE_URL}/userApps/` + user.id + '/applis');
  }

  deleteRessource(url) {
    const headers = new HttpHeaders({'authorization': 'Bearer ' + this.authService.jwt});
    return this.httpClient.delete(url, {headers: headers});
  }

  postRessource(url, data) {
    console.log(url);
    const headers = new HttpHeaders({'authorization': 'Bearer ' + this.authService.jwt});
    return this.httpClient.post(url, data, {headers: headers});
  }

  putRessource(url, data) {
    console.log(url);
    const headers = new HttpHeaders({'authorization': 'Bearer ' + this.authService.jwt});
    return this.httpClient.put(url, data, {headers: headers, observe: 'response'});
  }

  patchRessource(url, data){
    const headers = new HttpHeaders({'authorization': 'Bearer ' + this.authService.jwt});
    return this.httpClient.patch(url, data, {headers: headers}); // patch => ne met à jour que la ou les données qu'on envoi
  }

}
