import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Registration_Fees_ReportComponent } from './Registration_Fees_Report.component';


describe('Registration_Fees_ReportComponent', () => {
  let component: Registration_Fees_ReportComponent;
  let fixture: ComponentFixture<Registration_Fees_ReportComponent>;

  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [Registration_Fees_ReportComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Registration_Fees_ReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
