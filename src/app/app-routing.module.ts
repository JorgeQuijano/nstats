import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from "../app/views/home/home.component";
import { StatsComponent } from "../app/views/stats/stats.component";
import { AboutComponent } from "../app/views/about/about.component";
import { LoginComponent } from "../app/views/login/login.component";
import { MatchComponent } from "../app/views/match/match.component";
import { PersonaComponent } from "../app/views/persona/persona.component";
import { TeamsComponent } from "../app/views/teams/teams.component";
import { MatchDetailsComponent } from "../app/views/match-details/match-details.component";
import { TeamDetailsComponent } from "../app/views/team-details/team-details.component";
import { PersonaDetailsComponent } from "../app/views/persona-details/persona-details.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'match/:id', component: MatchDetailsComponent },
  { path: 'matches', component: MatchComponent },
  { path: 'persona/:id', component: PersonaDetailsComponent },
  { path: 'personas', component: PersonaComponent },
  { path: 'stats', component: StatsComponent },
  { path: 'about', component: AboutComponent },
  { path: 'login', component: LoginComponent },
  { path: 'teams', component: TeamsComponent },
  { path: 'team/:id', component: TeamDetailsComponent },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
