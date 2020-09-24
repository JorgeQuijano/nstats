import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { PersonaService } from "../../_services/persona/persona.service";
import { ActionService } from "../../_services/action/action.service";

@Component({
  selector: 'app-persona-details',
  templateUrl: './persona-details.component.html',
  styleUrls: ['./persona-details.component.css']
})
export class PersonaDetailsComponent implements OnInit {
  showlabels = false;
  selectedPersona: any;
  personaSummary: any;

  tableHeaders = [
    {'header': 'S', 'label': 'Season'},
    {'header': 'C', 'label': 'Competition/Tournament'},
    {'header': 'XI', 'label': 'Starting XI'},
    {'header': 'Sb', 'label': 'Substitute'},
    {'header': 'G', 'label': 'Goals Scored'},
    {'header': 'A', 'label': 'Assists'},
    {'header': 'Y', 'label': 'Yellow Cards'},
    {'header': 'R', 'label': 'Red Cards'},
    {'header': 'MP', 'label': 'Missed Penalties'},
    {'header': 'SP', 'label': 'Saved Penalties'},
    {'header': 'OG', 'label': 'Own Goals'},
    {'header': 'P', 'label': 'Post Hits'},
    {'header': 'PC', 'label': 'Penalties Conceded'},
    {'header': 'M', 'label': 'Manager'},
  ];

  constructor(
    private route: ActivatedRoute,
    private personaService: PersonaService,
    private actionService: ActionService,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.personaDetails(+params['id']);
    });
  }

  personaDetails(personaid:number):void {
    this.personaService.getPersona(personaid)
      .subscribe(res => {
        this.actionService.getPersonaSummary(personaid)
          .subscribe(x=> {
            this.personaSummary = x;
            this.selectedPersona = res;
          })
        
      } );    
  }

  hideLabels(): void {
    this.showlabels = !this.showlabels;
  }

}
