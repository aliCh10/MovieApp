import { Component } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: 'signup.page.html',
  styleUrls: ['signup.page.scss'],
})
export class SignupPage {
  username: string = '';
  email: string = '';
  password: string = '';
  profilePic: string | undefined;

  constructor(private alertController: AlertController) {}

  // Function to handle profile picture capture
  async takePicture() {
    const image = await Camera.getPhoto({
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
      quality: 100,
    });

    this.profilePic = image.dataUrl; // Store the captured image data URL
    console.log('Captured image:', this.profilePic);
    
    // You can now use this image as a profile picture or upload it to your server
  }

  // Form submission
  onSubmit() {
    if (!this.username || !this.email || !this.password || !this.profilePic) {
      this.showAlert('Please fill in all fields and take a profile picture.');
      return;
    }

    console.log('Form submitted', this.username, this.email, this.password, this.profilePic);
  }

  // Alert to notify the user
  async showAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
