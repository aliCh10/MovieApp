import { Component, OnInit } from '@angular/core';
import { Film } from '../Film';
import { AdminserviceService } from '../adminservice.service';

@Component({
  selector: 'app-add-movies',
  templateUrl: './add-movies.page.html',
  styleUrls: ['./add-movies.page.scss'],
})
export class AddMoviesPage implements OnInit {

  film: Film = {
    title: '',
    description: '',
    director: '',
    releaseDate: '',
  };
  selectedPhoto: File | null = null;

  constructor(private service: AdminserviceService) { }

  ngOnInit() {
    return 'hello';
  }


  onFileSelected(event: any) {
    this.selectedPhoto = event.target.files[0];
  }
  async onSubmit() {
    if (
      this.film.title &&
      this.film.description &&
      this.film.director &&
      this.film.releaseDate &&
      this.selectedPhoto
    ) {
      console.log(this.film,this.selectedPhoto);

      // try {
      //   await this.service.addFilm(this.film, this.selectedPhoto);
      //   alert('Film ajouté avec succès !');
      //   this.resetForm();
      // } catch (error) {
      //   console.error('Erreur lors de l\'ajout du film :', error);
      //   alert('Une erreur est survenue.');
      // }
    } else {
      alert('Veuillez remplir tous les champs et sélectionner une photo.');
    }
  }

  resetForm() {
    this.film = {
      title: '',
      description: '',
      director: '',
      releaseDate: '',
    };
    this.selectedPhoto = null;
  }

}
