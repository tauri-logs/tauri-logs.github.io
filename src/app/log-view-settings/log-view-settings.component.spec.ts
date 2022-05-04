import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogViewSettingsComponent } from './log-view-settings.component';

describe('LogViewSettingsComponent', () => {
  let component: LogViewSettingsComponent;
  let fixture: ComponentFixture<LogViewSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogViewSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogViewSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
