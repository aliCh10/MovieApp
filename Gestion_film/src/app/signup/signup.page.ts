import { Component } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: 'signup.page.html',
  styleUrls: ['signup.page.scss'],
})
export class SignupPage {
  username: string = '';
  email: string = '';
  password: string = '';
  profilePic: string | null | undefined = null; 
  uploadedPhoto: Blob | null = null;

  constructor(
    private alertController: AlertController,
    private authService: AuthService
  ) { }

  // Capture de photo avec la caméra
  async takePicture() {
    try {
      const image = await Camera.getPhoto({
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera,
        quality: 100,
      });

      // Convertir Data URL en Blob
      const response = await fetch(image.dataUrl!);
      this.uploadedPhoto = await response.blob();

      this.profilePic = image.dataUrl;  
    } catch (e) {
      console.error('Erreur de capture de la photo:', e);
      this.showAlert('Failed to capture photo.');
    }
  }

  // Soumission du formulaire d'inscription
  async onSubmit() {
    console.log('Form submitted'); // Vérifiez que cette ligne est exécutée
    if (!this.username || !this.email || !this.password || !this.uploadedPhoto) {
      this.showAlert('Please fill in all fields and take a profile picture.');
      return;
    }
  
    try {
      // Appel du service pour l'enregistrement
      await this.authService.register({
        email: this.email,
        password: this.password,
        username: this.username,
        photoFile: new File([this.uploadedPhoto], 'profile.jpg', { type: 'image/jpeg' })
      });
  
      this.showAlert('Registration successful!');  // Vérifiez si cette ligne est appelée
  
      // Réinitialiser les champs du formulaire
      this.username = '';
      this.email = '';
      this.password = '';
      this.profilePic = null;
      this.uploadedPhoto = null;
    } catch (error: any) {
      console.error('Registration error:', error);
      const errorMessage = this.getFriendlyErrorMessage(error.code) || 'Registration failed. Please try again.';
      this.showAlert(errorMessage);
    }
  }
  

  // Map des erreurs Firebase
  getFriendlyErrorMessage(errorCode: string): string | null {
    const errorMessages: { [key: string]: string } = {
      'auth/email-already-in-use': 'This email is already in use.',
      'auth/invalid-email': 'Invalid email address.',
      'auth/weak-password': 'Password is too weak. Please choose a stronger one.',
      'auth/network-request-failed': 'Network error. Please check your connection.',
    };
    return errorMessages[errorCode] || null;
  }

  // Afficher une alerte
  async showAlert(message: string) {
    console.log('Showing alert:', message); // Ajoutez cette ligne pour vérifier
    const alert = await this.alertController.create({
      header: 'Message',
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }
  
}
