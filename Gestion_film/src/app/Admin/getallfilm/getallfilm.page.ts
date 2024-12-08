// Exemple de code pour afficher l'image dans le frontend
import { Component, OnInit } from '@angular/core';
import { AdminserviceService } from '../adminservice.service';
import { Film } from '../Film';

@Component({
  selector: 'app-getallfilm',
  templateUrl: './getallfilm.page.html',
  styleUrls: ['./getallfilm.page.scss'],
})
export class GetallfilmPage implements OnInit {
  films: Film[] = [];  // Déclarer le tableau des films
  apiUrl = 'http://localhost:3000';  // L'URL de base de votre backend

  constructor(private service: AdminserviceService) { }


  ngOnInit() {
    this.service.getFilms().subscribe(films => {
      this.films = films;
  
      // Ajout du chemin complet pour les images
      this.films.forEach(film => {
        if (film.photoUrl) {
          film.photoUrl = `${this.apiUrl}${film.photoUrl}`;  // Préfixez l'URL avec l'URL de l'API backend
        }
      });
    });
  }
  
}
