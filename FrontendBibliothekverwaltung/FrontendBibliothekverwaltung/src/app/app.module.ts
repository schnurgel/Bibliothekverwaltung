import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
// @ts-ignore
import { AppRoutingModule } from "./app-routing.module";
// Importieren Sie Ihre anderen Komponenten hier
import { BookOverviewComponent } from './book-overview/book-overview.component';
import {RouterModule} from "@angular/router";
import {routes} from "./app.routes";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    // Deklarieren Sie Ihre Komponenten hier
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    AppComponent,
    BookOverviewComponent,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
