import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompositionTableComponent } from './composition-table.component';

describe('CompositionTableComponent', () => {
  let component: CompositionTableComponent;
  let fixture: ComponentFixture<CompositionTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompositionTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompositionTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
