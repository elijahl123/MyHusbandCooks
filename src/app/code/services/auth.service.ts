import { Injectable } from '@angular/core';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { app, db } from '../../app.module';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Sign in with email and password
  async signIn(email: string, password: string) {
    const auth = getAuth(app);
    return signInWithEmailAndPassword(auth, email, password);
  }

  // Sign up with email and password
  async signUp(email: string, password: string, firstName: string, lastName: string) {
    const auth = getAuth(app);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const userRef = doc(db, 'users', userCredential.user.uid);
      await setDoc(userRef, {
        firstName,
        lastName,
        email,
        superuser: false // Default to false
      });
      // Redirect to home or other page
    } catch (error: any) {
      console.error(error.message);
    }
  }

  // Sign out
  async signOut() {
    const auth = getAuth(app);
    return signOut(auth);
  }

  // Get the currently signed-in user
  async getUser() {
    const user = getAuth(app).currentUser;
    if (user) {
      const userRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userRef);
      return userDoc.data();
    }
    return null;
  }
}
