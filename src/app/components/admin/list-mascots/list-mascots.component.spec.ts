import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMascotsComponent } from './list-mascots.component';

describe('ListMascotsComponent', () => {
  let component: ListMascotsComponent;
  let fixture: ComponentFixture<ListMascotsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListMascotsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMascotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
