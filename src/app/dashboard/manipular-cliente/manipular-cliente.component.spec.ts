import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManipularClienteComponent } from './manipular-cliente.component';

describe('ManipularClienteComponent', () => {
  let component: ManipularClienteComponent;
  let fixture: ComponentFixture<ManipularClienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManipularClienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManipularClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
