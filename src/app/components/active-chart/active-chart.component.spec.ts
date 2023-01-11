import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveChartComponent } from './active-chart.component';

describe('ActiveChartComponent', () => {
  let component: ActiveChartComponent;
  let fixture: ComponentFixture<ActiveChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActiveChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActiveChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
