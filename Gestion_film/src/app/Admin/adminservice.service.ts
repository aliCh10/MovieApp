import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class AdminserviceService {

  constructor(
private storage: AngularFireStorage,
    private firestore: AngularFirestore
  ) { }


    async addFilm(film: any, photoFile: File) {
      const photoPath = `films/${new Date().getTime()}_${photoFile.name}`;
      const uploadTask = await this.storage.upload(photoPath, photoFile);
      const photoUrl = await uploadTask.ref.getDownloadURL();
      film.photoUrl = photoUrl;
      return this.firestore.collection('films').add(film);



    }

}
