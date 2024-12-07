import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Film } from './Film';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminserviceService {

  constructor(private http: HttpClient) {}

  addFilm(film: Film, photoFile: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', photoFile, photoFile.name);


    return this.http.post<{ file: string }>("http://localhost:3000/upload", formData).pipe(
      switchMap(res => {
        console.log(res);


        film.photoUrl = res.file;


        return this.http.post('https://movieapp-da7f9-default-rtdb.firebaseio.com/film.json', film);
      })
    );
  }



  getFilms(): Observable<Film[]> {
    return this.http.get<Film[]>('https://movieapp-da7f9-default-rtdb.firebaseio.com/film.json');

  }

}
