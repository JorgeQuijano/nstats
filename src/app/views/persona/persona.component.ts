import { Component, OnInit } from '@angular/core';
import { PersonaService } from "../../_services/persona/persona.service";
import { ActionService } from "../../_services/action/action.service";
import { ModalService } from '../../_modal/modal.service';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit {

  tableData = [];
  temptableData = [];
  selectedPersonaID: number;
  selectedPersona: any;
  personaSummary: any;
  sortState: string;
  tableHeaders = [
    {'header': 'PID', 'value': 'personaid'},
    {'header': 'First Name', 'value': 'firstname'},
    {'header': 'Last Name', 'value': 'lastname'},
    {'header': 'Nationality', 'value': 'nationality'},
    {'header': 'Citizenship', 'value': 'citizenship'},
    {'header': 'Date of Birth (YMD)', 'value': 'fdob'},
    {'header': 'Nickname', 'value': 'notes'},
    {'header': 'Details', 'value': 'details'}
  ];

  filterOptions = [
    {'option': 'Sort ASC'},
    {'option': 'Sort DESC'},
  ];

  constructor(
    private personaService: PersonaService,
    private actionService: ActionService,
    private modalService: ModalService
  ) { }

  ngOnInit(): void {
    this.gerPersonas();
  }
  

  gerPersonas(): void {
    this.personaService.getPersonas()
      .subscribe(res => {
        this.tableData = res;
        this.temptableData = res;
      } );
  }

  sortTable(x:string): void {
    if (this.sortState == undefined) {
      console.log(this.sortState);
      this.temptableData.sort((a, b) => a[x] < b[x] ? -1 : a[x] > b[x] ? 1 : 0);
      this.sortState = 'asc'
    } else if (this.sortState == 'desc'){
      console.log(this.sortState);
      this.temptableData.sort((a, b) => a[x] < b[x] ? 1 : a[x] > b[x] ? -1 : 0);
      this.sortState = 'asc'
    } else if (this.sortState == 'asc'){
      console.log(this.sortState);
      this.temptableData.sort((a, b) => a[x] < b[x] ? -1 : a[x] > b[x] ? 1 : 0);
      this.sortState = 'desc'
    }
    
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

  closeModal(id: string) {
    this.modalService.close(id);
  }

}
