import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from '@angular/forms';

import { ModalModule } from './_modal';

import { HttpErrorHandler } from "../app/_services/http-error-handler.service";
import { MessageService } from "../app/_services/message.service";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { StatsComponent } from './views/stats/stats.component';
import { AboutComponent } from './views/about/about.component';
import { LoginComponent } from './views/login/login.component';
import { HomeComponent } from './views/home/home.component';
import { MatchComponent } from './views/match/match.component';
import { PersonaComponent } from './views/persona/persona.component';
import { TeamsComponent } from './views/teams/teams.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    StatsComponent,
    AboutComponent,
    LoginComponent,
    HomeComponent,
    MatchComponent,
    PersonaComponent,
    TeamsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ModalModule,
    FormsModule
  ],
  providers: [
    MessageService,
    HttpErrorHandler
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
