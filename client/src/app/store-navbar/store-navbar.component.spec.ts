import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreNavbarComponent } from './store-navbar.component';

describe('StoreNavbarComponent', () => {
  let component: StoreNavbarComponent;
  let fixture: ComponentFixture<StoreNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
