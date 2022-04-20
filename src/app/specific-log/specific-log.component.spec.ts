import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificLogComponent } from './specific-log.component';

describe('SpecificLogComponent', () => {
  let component: SpecificLogComponent;
  let fixture: ComponentFixture<SpecificLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecificLogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecificLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
