import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationCollectionReportComponent } from './application-collection-report.component';

describe('ApplicationCollectionReportComponent', () => {
  let component: ApplicationCollectionReportComponent;
  let fixture: ComponentFixture<ApplicationCollectionReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationCollectionReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationCollectionReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
