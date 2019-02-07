import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsMascotComponent } from './details-mascot.component';

describe('DetailsMascotComponent', () => {
  let component: DetailsMascotComponent;
  let fixture: ComponentFixture<DetailsMascotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsMascotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsMascotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
