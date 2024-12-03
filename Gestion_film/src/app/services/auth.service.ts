import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile
} from '@angular/fire/auth';
import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private auth: Auth, private storage: Storage) {}

  // Inscription avec email, mot de passe, nom d'utilisateur et photo
  async register({ email, password, username, photoFile }: { email: string; password: string; username: string; photoFile: File }) {
    try {
      console.log('Registering user...');
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      const user = userCredential.user;
  
      console.log('User created:', user);
      // Télécharger l'image dans Firebase Storage
      const photoRef = ref(this.storage, `profilePhotos/${user.uid}`);
      await uploadBytes(photoRef, photoFile);
  
      // Récupérer l'URL de l'image téléchargée
      const photoURL = await getDownloadURL(photoRef);
  
      console.log('Photo URL:', photoURL);
      // Mettre à jour le profil de l'utilisateur avec le nom d'utilisateur et l'URL de l'image
      await updateProfile(user, { displayName: username, photoURL });
  
      return user;
    } catch (error) {
      console.error('Registration service error:', error);
      throw error;  // Re-lancer l'erreur pour que le composant la capture
    }
  }
  

  // Connexion
  async login({ email, password }: { email: string; password: string }) {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      return userCredential.user;
    } catch (e) {
      console.error('Erreur de connexion:', e);
      return null;
    }
  }

  // Déconnexion
  logout() {
    return signOut(this.auth);
  }
}
