import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogStatisticsTableComponent } from './log-statistics-table.component';

describe('LogStatisticsTableComponent', () => {
  let component: LogStatisticsTableComponent;
  let fixture: ComponentFixture<LogStatisticsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogStatisticsTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogStatisticsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
