import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Film } from './Film';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminserviceService {
  private apiUrl = 'http://localhost:3000';  // URL de votre backend

  constructor(private http: HttpClient) {}

  // Méthode pour ajouter un film
  addFilm(film: Film, photoFile: File): Observable<any> {
    const formData = new FormData();
    formData.append('image', photoFile, photoFile.name);  // Utiliser 'image' pour le champ du fichier

    // Envoie du fichier au backend
    return this.http.post<{ filePath: string }>(`${this.apiUrl}/upload?type=movies`, formData).pipe(
      switchMap(res => {
        console.log(res);
        film.photoUrl = res.filePath;  // Stocke le chemin de l'image dans l'objet `film`
        console.log(film.photoUrl);

        // Envoie des données du film à la base de données (Firebase, ou autre)
        return this.http.post('https://movieapp-da7f9-default-rtdb.firebaseio.com/film.json', film);
      })
    );
  }

  // Méthode pour récupérer les films
  getFilms(): Observable<Film[]> {
    return this.http.get<{ [key: string]: Film }>('https://movieapp-da7f9-default-rtdb.firebaseio.com/film.json').pipe(
      map(filmsData => {
        const filmsArray: Film[] = [];
        for (const key in filmsData) {
          filmsArray.push({ ...filmsData[key], id: key });
          console.log(filmsArray)
        }
        return filmsArray;
      })
    );
  }
  getMovies(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/list-movies`);
  }
  addToFavorites(filmId: any, userId: string): Observable<any> {
    // Use default values for undefined inputs
    const favoriteFilm = { filmId: filmId || 'defaultFilmId', userId: userId || 'defaultUserId' };
  
    return this.http.post('https://movieapp-da7f9-default-rtdb.firebaseio.com/favorites.json', favoriteFilm);
  }

}
  