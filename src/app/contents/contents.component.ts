import { Component, OnInit } from '@angular/core';
import { PortailService } from '../services/portail.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';


@Component({
  selector: 'app-contents',
  templateUrl: './contents.component.html',
  styleUrls: ['./contents.component.css']
})
export class ContentsComponent implements OnInit {
  contentList;

  constructor(private portailService: PortailService, private activatedRoute: ActivatedRoute, private router: Router) {
    /* router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        console.log('url encodée Base64: ' + this.activatedRoute.snapshot.params.url);
        let param: string = this.activatedRoute.snapshot.params.url;
        // const param: string = this.activatedRoute.snapshot.params.id;
        let url = atob(param); // url décodée en base 64
        console.log('url décodée Base64: ' + url);
        this.getContents(url);
      }
    }); */
   }

  ngOnInit() {
    // le constructeur se charge une seule fois donc il faut écouter l'url pour que changement OK
    // Navigation Start : on peut récupérer paramètres avant que l'url change
    // Navigation End : on peut récupérer paramètres quand l'url change
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        console.log('url encodée Base64: ' + this.activatedRoute.snapshot.params.url);
        let param: string = this.activatedRoute.snapshot.params.url;
        // const param: string = this.activatedRoute.snapshot.params.id;
        let url = atob(param); // url décodée en base 64
        console.log('url décodée Base64: ' + url);
        this.getContents(url);
      }
    });
  }

  // récupère contenus via l'url décodée en Base 64 et via le Service
  getContents(url) {
    this.portailService.getRessource(url)
        .subscribe(data => {
          this.contentList = data;
        }, err => {
          console.log(err);
        });
  }

}

