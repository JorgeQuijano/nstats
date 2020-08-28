import { Component, OnInit } from '@angular/core';
import { TeamService } from "../../_services/team/team.service";
import { ModalService } from '../../_modal/modal.service';
import { MatchService } from "../../_services/match/match.service";

import { Team } from "../../_services/team/team";

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {

  matchLimit = 15;
  teams: any;
  selectedTeam: any;
  sTeamMatches: any;
  teamTableHeaders = [
    {'header': 'TID', 'value': 'teamid'},
    {'header': 'Team', 'value': 'teamshortname'},
    {'header': 'Country', 'value': 'country'},
    {'header': 'City', 'value': 'city'},
    {'header': 'Assoc', 'value': 'association'},
    {'header': 'Conf', 'value': 'confederation'},
    {'header': 'Details', 'value': 'details'}
  ];

  matchTableHeaders = [
    {'header': 'Date', 'value': 'matchdate'},
    {'header': 'Comp', 'value': 'compcode'},
    {'header': 'Season', 'value': 'seasonname'},
    {'header': 'Stage', 'value': 'stageshort'},
    {'header': 'Side', 'value': 'side'},
    {'header': 'Team', 'value': 'teamcode'},
    {'header': 'FT', 'value': 'score'},
    {'header': 'Against', 'value': 'against'},
    {'header': 'Result', 'value': 'resultft'},
    {'header': 'HT', 'value': 'htscore'},
    {'header': 'HT', 'value': 'resultht'},
    
  ];

  constructor(
    private teamService: TeamService,
    private modalService: ModalService,
    private matchService: MatchService
  ) { }

  ngOnInit(): void {
    this.getTeams();
  }

  getTeams():void {
    this.teamService.getTeams()
      .subscribe(x=>{
        this.teams = x;
      })
  }

  teamDetails(team: Team, modalid: string): void {
    
    // Fixed limit (15 matches), we can change this later -----TBD------
    this.matchService.getSincleColumnMatches(team.teamid, this.matchLimit)
      .subscribe(x=> {
        this.selectedTeam = team;
        this.sTeamMatches = x;
        this.modalService.open(modalid);
      })
    
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

}
