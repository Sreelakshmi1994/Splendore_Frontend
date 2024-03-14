import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Receipt_Summary_ReportComponent } from './Receipt_Summary_Report.component';


describe('Receipt_Summary_ReportComponent', () => {
  let component: Receipt_Summary_ReportComponent;
  let fixture: ComponentFixture<Receipt_Summary_ReportComponent>;

  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [Receipt_Summary_ReportComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Receipt_Summary_ReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
