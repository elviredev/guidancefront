import { Component, OnInit } from '@angular/core';
import { PortailService } from 'src/app/services/portail.service';
import { faTrash, faPlus, faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-admin-applis',
  templateUrl: './admin-applis.component.html',
  styleUrls: ['./admin-applis.component.css']
})
export class AdminApplisComponent implements OnInit {
  appliList;
  mode = 'list';
  currentAppli;
  trashIcon = faTrash;
  plusIcon = faPlus;
  editIcon = faEdit;
  constructor(private portailService: PortailService ) { }

  ngOnInit() {
    this.onGetAllApplis();
  }

  onGetAllApplis(){
    this.portailService.getAllApplis()
        .subscribe(data => {
          this.appliList = data;
        }, err => {
          console.error(err);
        });
  }

  onDeleteAppli(appli){
    let conf = confirm('Etes-vous sûr de vouloir supprimer ?');
    if (!conf) return;
    this.portailService.deleteRessource(appli._links.self.href)
        .subscribe(data => {
          // recharge les applis pour vérifier si l'appli a bien été supprimée
          this.onGetAllApplis();

        }, err => {
          console.error(err);
        });
  }

  onNewAppli(){
    this.mode = 'new-app';
  }

  onSaveAppli(data){
    console.log(data);
    let url = this.portailService.BASE_URL + '/applis';
    this.portailService.postRessource(url, data)
        .subscribe(data => {
          this.mode = 'list';
          this.onGetAllApplis();
        }, err => {
          console.error(err);
        });
  }

  onUpdateAppli(data){
    this.portailService.putRessource(this.currentAppli._links.self.href, data)
        .subscribe(data => {
          this.mode = 'list';
          this.onGetAllApplis();
        }, err => {
          console.error(err);
        });
  }

  onEditAppli(appli) {
    // récupère l'appli via l'url de cette ressource
    this.portailService.getRessource(appli._links.self.href)
        .subscribe(data => {
          // une fois les data (l'appli) récupérées du server je les stocke dans l'appli courante
          this.currentAppli = data;
          // afficher l'appli dans le formulaire
          this.mode = 'edit-app';
        }, err => {
          console.error(err);
        });
  }

}

