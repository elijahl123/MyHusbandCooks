import {Component} from '@angular/core';
import {onAuthStateChanged} from 'firebase/auth';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {auth, db} from '../../../app.module';
import {doc, getDoc, setDoc, updateDoc} from 'firebase/firestore';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent {
  accountForm: FormGroup;
  userId: string = '';

  constructor(private fb: FormBuilder) {
    this.accountForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      superuser: [false],
      emailOptIn: [true]
    });
    onAuthStateChanged(auth, user => {
      if (user) {
        this.userId = user.uid;
        this.loadUserData().then();
      }
    });
  }

  async loadUserData() {
    const userRef = doc(db, 'users', this.userId);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      let userData = userDoc.data();
      if (!('emailOptIn' in userData)) {
        // If emailOptIn field does not exist, add it and set it to true
        userData.emailOptIn = true;
        await updateDoc(userRef, { emailOptIn: true });
      }
      this.accountForm.setValue(userData);
    }
  }

  async saveChanges() {
    if (this.accountForm.valid) {
      const userRef = doc(db, 'users', this.userId);
      await setDoc(userRef, this.accountForm.value, { merge: true });
      // Optionally, provide feedback to the user, such as a success message
      alert('Your changes have been saved.');
    } else {
      // Handle form validation errors
    }
  }
}
