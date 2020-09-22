import { Component, OnInit } from '@angular/core';
import { PersonaService } from "../../_services/persona/persona.service";
import { ActionService } from "../../_services/action/action.service";
import { ModalService } from '../../_modal/modal.service';
import { PagerService } from "../../_services/pagination/pager.service";

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit {

  tableData = [];
  temptableData = [];

  pager: any = {};
  pagedItems: any[];
  currentPage = 1;

  selectedPersonaID: number;
  selectedPersona: any;
  personaSummary: any;
  sortState: string;
  tableHeaders = [
    {'header': 'First Name', 'value': 'firstname'},
    {'header': 'Last Name', 'value': 'lastname'},
    {'header': 'DOB', 'value': 'fdob'}
  ];

  filterOptions = [
    {'option': 'Sort ASC'},
    {'option': 'Sort DESC'},
  ];

  constructor(
    private personaService: PersonaService,
    private actionService: ActionService,
    private modalService: ModalService,
    private pagerService: PagerService
  ) { }

  ngOnInit(): void {
    this.gerPersonas();
  }
  

  gerPersonas(): void {
    this.personaService.getPersonas()
      .subscribe(res => {
        this.tableData = res;
        this.temptableData = res;
        this.setPage(this.currentPage);
      } );
  }

  searchPersona(event: any):void{
    console.log(event.target.value);
    this.temptableData = this.tableData;
    let term = event.target.value;
    let filteredPersonas = this.temptableData.filter(
      x =>
      x.fullname.toLowerCase().includes(term.toLowerCase())
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

  personaDetails(personaid:number, modalid:string):void {
    this.personaService.getPersona(personaid)
      .subscribe(res => {
        this.actionService.getPersonaSummary(personaid)
          .subscribe(x=> {
            this.personaSummary = x;
            this.selectedPersona = res;
            this.selectedPersonaID = personaid;
            this.modalService.open(modalid);
          })
        
      } );    
  }

  setPage(page: number) {
    this.pager = this.pagerService.getPager(this.temptableData.length, page);
    this.pagedItems = this.temptableData.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

}
