import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, updateProfile } from '@angular/fire/auth';
import { HttpClient } from '@angular/common/http';
import { Firestore, doc, getDoc, setDoc, updateDoc } from '@angular/fire/firestore';
import { collection, getDocs } from "firebase/firestore";
import { User } from '../users';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private uploadUrl = 'http://localhost:3000/upload'; // URL du backend

  constructor(private auth: Auth, private http: HttpClient, private firestore: Firestore) {}

  // Méthode d'inscription avec téléchargement d'image
  async register({
    email,
    password,
    username,
    role = 'user', // Par défaut, le rôle est "user"
    photoFile,
    type = 'users' // By default, it will be a user image
  }: {
    email: string;
    password: string;
    username: string;
    role?: string;
    photoFile: File;
    type?: 'users' | 'movie'; // Define the type of image ('user' or 'movie')
  }): Promise<User> {
    try {
      console.log('Registering user...');

      // Étape 1 : Télécharger l'image sur le backend
      const formData = new FormData();
      formData.append('image', photoFile);

      // Append the type parameter to specify whether it's a 'user' or 'movie' image
      const uploadResponse: any = await this.http
        .post(`${this.uploadUrl}?type=${type}`, formData)
        .toPromise();

      const photoURL = uploadResponse.filePath; // URL retournée par le backend
      console.log('Photo URL:', photoURL);

      // Étape 2 : Créer l'utilisateur dans Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      const user = userCredential.user;
      console.log('User created:', user);

      // Étape 3 : Mettre à jour le profil Firebase
      await updateProfile(user, { displayName: username, photoURL });

      // Étape 4 : Enregistrer les informations dans Firestore
      const userDocRef = doc(this.firestore, `users/${user.uid}`);
      const newUser: User = {
        uid: user.uid,
        email,
        username,
        role,
        photoURL,
        isBlocked: false // Par défaut, l'utilisateur n'est pas bloqué
      };

      await setDoc(userDocRef, newUser);

      return newUser; // Retourner l'objet utilisateur
    } catch (error) {
      console.error('Registration service error:', error);
      throw error; // Re-lancer l'erreur pour que le composant la capture
    }
  }

  // Méthode pour récupérer les données d'un utilisateur spécifique
  async getUserData(uid: string): Promise<User | null> {
    try {
      const userDocRef = doc(this.firestore, `users/${uid}`);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        return null;
      }

      const userData = userDoc.data() as User; // Caster les données au type User
      return userData;
    } catch (error) {
      console.error('Erreur lors de la récupération des données utilisateur:', error);
      return null;
    }
  }

  // Méthode de connexion
  async login(email: string, password: string): Promise<User | null> {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      const user = userCredential.user;

      if (!user) return null;

      // Récupérer les données de Firestore
      const userData = await this.getUserData(user.uid);
      return userData;
    } catch (error) {
      console.error('Login error:', error);
      return null;
    }
  }

  // Méthode pour récupérer tous les utilisateurs
  async getAllUsers(): Promise<User[]> {
    try {
      const usersRef = collection(this.firestore, "users");
      const snapshot = await getDocs(usersRef);

      const users: User[] = snapshot.docs.map(doc => {
        return {
          id: doc.id, // Get document ID
          ...(doc.data() as User) // Caster les données au type User
        };
      });

      return users;
    } catch (error) {
      console.error("Error fetching users:", error);
      return [];
    }
  }

  // Méthode de déconnexion
  async logout(): Promise<void> {
    try {
      await signOut(this.auth);
      console.log('User logged out');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  }
  async updateUserStatus(userId: string, isBlocked: boolean): Promise<void> {
    if (!userId) {
      throw new Error('User ID is required to update status');
    }

    const userDocRef = doc(this.firestore, `users/${userId}`);
    await updateDoc(userDocRef, { isBlocked });
    console.log('User status updated successfully');
  }
  
}
