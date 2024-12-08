import { Component, OnInit } from '@angular/core';
import { Film } from '../Film';
import { AdminserviceService } from '../adminservice.service';
import { AlertController } from '@ionic/angular';  // Import AlertController

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
  selectedFile: File | null = null;

  constructor(
    private service: AdminserviceService,
    private alertController: AlertController  // Inject AlertController
  ) { }

  ngOnInit() {
    return 'hello';
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  async onSubmit(): Promise<void> {
    if (this.selectedFile) {
      this.service.addFilm(this.film, this.selectedFile).subscribe({
        next: async (response) => {
          console.log('Film ajouté avec succès', response);
          // Show success alert
          const alert = await this.alertController.create({
            header: 'Film Ajouté',
            message: 'Le film a été ajouté avec succès.',
            cssClass: 'success-alert',  // Apply custom class for success
            buttons: ['OK'],
          });
          await alert.present();
        },
        error: async (error) => {
          console.error('Erreur lors de l\'ajout du film', error);
          // Show error alert
          const alert = await this.alertController.create({
            header: 'Erreur',
            message: 'Une erreur est survenue lors de l\'ajout du film.',
            cssClass: 'error-alert',  // Apply custom class for error
            buttons: ['OK'],
          });
          await alert.present();
        }
      });
    } else {
      console.error('Veuillez sélectionner un fichier pour l\'affiche du film');
      // Show alert if no file is selected
      const alert = await this.alertController.create({
        header: 'Erreur',
        message: 'Veuillez sélectionner un fichier pour l\'affiche du film.',
        cssClass: 'warning-alert',  // Apply custom class for warning
        buttons: ['OK'],
      });
      await alert.present();
    }
  }
}
