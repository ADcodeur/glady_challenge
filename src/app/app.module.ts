import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { FindCardBestMatchComponent } from './components/find-card-best-match/find-card-best-match.component';
import { HomeComponent } from './modules/home/home.component';
import { ApiAuthService } from './services/api-auth-service.service';

@NgModule({
  declarations: [AppComponent, HomeComponent, FindCardBestMatchComponent],
  imports: [BrowserModule, HttpClientModule, ReactiveFormsModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ApiAuthService, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
