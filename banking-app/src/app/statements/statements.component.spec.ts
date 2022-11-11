import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatementsComponent } from './statements.component';

describe('StatementsComponent', () => {
  let component: StatementsComponent;
  let fixture: ComponentFixture<StatementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatementsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
