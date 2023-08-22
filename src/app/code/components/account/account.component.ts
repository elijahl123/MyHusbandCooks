import { Component } from '@angular/core';
import { onAuthStateChanged } from 'firebase/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { auth, db } from '../../../app.module';
import { doc, getDoc, setDoc } from 'firebase/firestore';

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
      superuser: [false]
    });
    onAuthStateChanged(auth, user => {
      if (user) {
        this.userId = user.uid;
        this.loadUserData();
      }
    });
  }

  async loadUserData() {
    const userRef = doc(db, 'users', this.userId);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      this.accountForm.setValue(userDoc.data());
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
