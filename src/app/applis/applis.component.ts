import { Component, OnInit } from '@angular/core';
import { PortailService } from '../services/portail.service';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-applis',
  templateUrl: './applis.component.html',
  styleUrls: ['./applis.component.css']
})
export class ApplisComponent implements OnInit {
  appliList;
  currentAppli;

  constructor(private portailService: PortailService, private router: Router, private authService: AuthenticationService) { }

  ngOnInit() {
    // liste des applis d'un user authentifié
    this.portailService.getApplisByUser(this.authService.user)
        .subscribe(data => {
          this.appliList = data;
        }, err => {
          console.error(err);
        });

  }

  // récupère les contenus d'une appli avec clic sur l'appli et renvoi vers page "contents" avec url encodée en base 64
  onGetContentsAppli(appli) {
    this.currentAppli = appli;
    console.log('appli : ' + appli._links.contents.href);
    let url = appli._links.contents.href;
    this.router.navigateByUrl('/contents/' + btoa(url)); // btoa() => encoder une url en string base 64
  }

}
