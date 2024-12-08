import { Component, OnInit } from '@angular/core';
import { AdminserviceService } from '../Admin/adminservice.service';
import { HttpClient } from '@angular/common/http';
import { Film } from '../Admin/Film';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  // Configuration de la diapositive (Swiper)
  slideOpts = {
    initialSlide: 0,
    speed: 400,
    autoplay: true,
    loop: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  };
  userId: string = "uPhlnu7nnfV4PVAEaDVGteDuN9h2"
; // Example user ID

  films: Film[] = []; // Définir films comme un tableau vide au début
  apiUrl = 'http://localhost:3000';  // L'URL de base de votre backend


  constructor(private http: HttpClient, private adminservice: AdminserviceService) {}

  // Implémentation de la méthode ngOnInit pour récupérer les films dès que le composant est initialisé
  ngOnInit() {
    this.getFilms();  // Appeler la méthode getFilms pour récupérer les films
  }

  // Méthode pour obtenir les films via le service Adminservice
  getFilms() {
    this.adminservice.getFilms().subscribe(
      (filmsData) => {
        this.films = filmsData;  // Stocke les films récupérés dans la variable 'films'
        
        // Maintenant, vous pouvez mettre à jour les 'photoUrl' après avoir reçu les films
        this.films.forEach(film => {
          if (film.photoUrl) {
            film.photoUrl = `${this.apiUrl}${film.photoUrl}`;  // Préfixez l'URL avec l'URL de l'API backend
          }
        });
  
        console.log(this.films);   // Affiche les films dans la console pour le débogage
      },
      (error) => {
        console.error('Erreur lors de la récupération des films:', error);
      }
    );
  }
  addToFavorites(filmId: string) {
    this.adminservice.addToFavorites(filmId, this.userId).subscribe(response => {
      console.log('Film added to favorites!', response);
    });
  }
  
}
