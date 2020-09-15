import { Component, OnInit } from '@angular/core';
import { TeamService } from "../../_services/team/team.service";
import { ModalService } from '../../_modal/modal.service';
import { MatchService } from "../../_services/match/match.service";
import { PagerService } from "../../_services/pagination/pager.service";
import { Team } from "../../_services/team/team";

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {

  pager: any = {};
  tableData = [];
  temptableData = [];
  sortState: string;
  pagedItems: any[];
  currentPage = 1;

  matchLimit = 15;
  teams: any;
  selectedTeam: any;
  sTeamMatches: any;
  teamTableHeaders = [
    // {'header': 'TID', 'value': 'teamid'},
    {'header': 'Team', 'value': 'teamshortname'},
    {'header': 'Country', 'value': 'countryname'},
    // {'header': 'Details', 'value': 'details'}
  ];

  matchTableHeaders = [
    {'header': 'Date', 'value': 'matchdate'},
    {'header': 'Comp', 'value': 'compcode'},
    // {'header': 'Season', 'value': 'seasonname'},
    // {'header': 'Stage', 'value': 'stageshort'},
    {'header': 'Side', 'value': 'side'},
    // {'header': 'Team', 'value': 'teamcode'},
    {'header': 'Score', 'value': 'score'},
    {'header': 'Against', 'value': 'against'},
    {'header': 'FT', 'value': 'resultft'},
    {'header': 'HT', 'value': 'htscore'},
    {'header': 'HT', 'value': 'resultht'},
    
  ];

  constructor(
    private teamService: TeamService,
    private modalService: ModalService,
    private matchService: MatchService,
    private pagerService: PagerService
  ) { }

  ngOnInit(): void {
    this.getTeams();
  }

  getTeams():void {
    this.teamService.getTeams()
      .subscribe(x=>{
        this.tableData = x;
        this.temptableData = x;
        this.setPage(this.currentPage);
      })
  }

  searchTeam(event: any):void{
    this.temptableData = this.tableData;
    let term = event.target.value;
    term.toLowerCase();
    let filteredPersonas = this.temptableData.filter(
      x =>
      x.teamfullname.toLowerCase().includes(term)
    )
    this.temptableData = filteredPersonas;
    this.setPage(this.pager.currentPage);
  }

  sortTable(x:string): void {
    if (this.sortState == undefined) {
      this.temptableData.sort((a, b) => a[x] < b[x] ? -1 : a[x] > b[x] ? 1 : 0);
      this.sortState = 'asc'
    } else if (this.sortState == 'desc'){
      this.temptableData.sort((a, b) => a[x] < b[x] ? 1 : a[x] > b[x] ? -1 : 0);
      this.sortState = 'asc'
    } else if (this.sortState == 'asc'){
      this.temptableData.sort((a, b) => a[x] < b[x] ? -1 : a[x] > b[x] ? 1 : 0);
      this.sortState = 'desc'
    }
    this.pager = this.pagerService.getPager(this.temptableData.length, this.currentPage);
    this.setPage(this.pager.currentPage);
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

  setPage(page: number) {
    // get pager object from service
    this.pager = this.pagerService.getPager(this.temptableData.length, page);

    // get current page of items
    this.pagedItems = this.temptableData.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

}
