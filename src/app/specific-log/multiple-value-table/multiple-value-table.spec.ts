import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TwoValueTable} from './multiple-value-table.component';

describe('LogStatisticsTableComponent', () => {
  let component: TwoValueTable;
  let fixture: ComponentFixture<TwoValueTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TwoValueTable]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TwoValueTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
