import { Injectable } from '@angular/core';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../../app.module';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Sign in with email and password
  signIn(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  // Sign up with email and password
  signUp(email: string, password: string) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  // Sign out
  signOut() {
    return signOut(auth);
  }
}
