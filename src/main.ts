import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
/* Core Grid CSS */




platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
