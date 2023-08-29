import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .then(() => {
    // Hide the splash screen
    const splash = document.getElementById('splash-screen');
    if (splash) {
      splash.classList.add('hide');
      setTimeout(() => splash.remove(), 1000); // Remove after transition
    }
  })
  .catch(err => console.error(err));
