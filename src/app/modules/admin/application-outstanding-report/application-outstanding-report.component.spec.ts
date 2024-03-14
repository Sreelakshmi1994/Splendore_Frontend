import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationOutstandingReportComponent } from './application-outstanding-report.component';

describe('ApplicationOutstandingReportComponent', () => {
  let component: ApplicationOutstandingReportComponent;
  let fixture: ComponentFixture<ApplicationOutstandingReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationOutstandingReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationOutstandingReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
