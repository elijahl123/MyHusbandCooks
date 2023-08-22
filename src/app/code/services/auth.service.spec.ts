import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // Test for signUp method
  it('should sign up a user', async () => {
    const email = 'test@example.com'; // Replace with a valid email
    const password = 'test-password'; // Replace with a valid password
    const firstName = 'Test';
    const lastName = 'User';
    await service.signUp(email, password, firstName, lastName);
    // Additional assertions based on your authentication setup
  });

  // Test for signOut method
  it('should sign out a user', async () => {
    await service.signOut();
    // Additional assertions based on your authentication setup
  });

  // Test for signIn method
  it('should sign in a user', async () => {
    const email = 'test@example.com'; // Replace with a valid email
    const password = 'test-password'; // Replace with a valid password
    const result = await service.signIn(email, password);
    expect(result).toBeDefined();
    // Additional assertions based on your authentication setup
  });

  // Test for getUser method
  it('should get the currently signed-in user', async () => {
    const user = await service.getUser();
    expect(user).toBeDefined();
    // Additional assertions based on your authentication setup
    console.log(user);
  });

  // Test for deleteUser method
  it('should delete a user', async () => {
    await service.deleteUser();
    // Additional assertions based on your authentication setup
  });
});
