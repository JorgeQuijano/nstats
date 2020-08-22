import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from "../app/views/home/home.component";
import { StatsComponent } from "../app/views/stats/stats.component";
import { AboutComponent } from "../app/views/about/about.component";
import { LoginComponent } from "../app/views/login/login.component";
import { MatchComponent } from "../app/views/match/match.component";
import { PersonaComponent } from "../app/views/persona/persona.component";


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'match', component: MatchComponent },
  { path: 'persona', component: PersonaComponent },
  { path: 'stats', component: StatsComponent },
  { path: 'about', component: AboutComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
