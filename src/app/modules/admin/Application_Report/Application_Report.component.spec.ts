import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Application_ReportComponent } from './Application_Report.component';


describe('Application_ReportComponent', () => {
  let component: Application_ReportComponent;
  let fixture: ComponentFixture<Application_ReportComponent>;

  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [Application_ReportComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Application_ReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
