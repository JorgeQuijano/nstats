import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonaDetailsComponent } from './persona-details.component';

describe('PersonaDetailsComponent', () => {
  let component: PersonaDetailsComponent;
  let fixture: ComponentFixture<PersonaDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonaDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonaDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
