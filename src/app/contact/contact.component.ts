import { Component, OnInit, ViewChild } from '@angular/core';
import { Email } from '../models/Email';
import { EmailService } from '../services/email.service';
import { Router } from '@angular/router';
import { error } from 'util';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  emailUser: Email = new Email();
  submitted = false;
  error: {};
  //@ViewChild('formContact', {static: false}) form: any; // avec this.form.reset

  constructor(private emailService: EmailService, private router: Router) { }

  ngOnInit() {
  }

  envoyerEmail() {
    this.submitted = true;
    return this.emailService.envoyerEmail(this.emailUser)
        .subscribe(data => {
          this.emailUser = data;
          console.log(data);
          //location.reload();
          //this.form.reset();
          
        }, error => {
          console.error(error);
          this.error = error;
          //alert('Une erreur est survenue lors de l\'envoi du courrier électronique');
        });
  }

  onSubmit() {
    this.envoyerEmail();  
   
  }

  goHome() {
    this.router.navigate(['/']);
  }

}
