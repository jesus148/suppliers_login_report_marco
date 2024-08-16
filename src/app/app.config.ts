import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';


import { routes } from './app.routes';



// provideHttpClient() su import
import { provideHttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
     provideRouter(routes) ,
          // para q nuetra aplicacion pueda usar servicios rest , requiere un import
          provideHttpClient() , MessageService

        ]
};