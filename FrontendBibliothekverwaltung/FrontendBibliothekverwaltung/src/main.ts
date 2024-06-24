import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import {importProvidersFrom} from "@angular/core";
import {provideRouter, withComponentInputBinding} from "@angular/router";
import {routes} from "./app/app.routes";
import {HttpClientModule} from "@angular/common/http";

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(HttpClientModule),
    provideRouter(routes, withComponentInputBinding())
  ]
}).catch(err => console.error(err));
