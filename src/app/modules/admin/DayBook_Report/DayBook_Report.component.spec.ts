import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DayBook_ReportComponent } from './DayBook_Report.component';
describe('DayBook_ReportComponent', () => {
let component: DayBook_ReportComponent;
let fixture: ComponentFixture<DayBook_ReportComponent>;
beforeEach(async(() => {
TestBed.configureTestingModule({
declarations: [ DayBook_ReportComponent ]
})
.compileComponents();
}));
beforeEach(() => {
fixture = TestBed.createComponent(DayBook_ReportComponent);
component = fixture.componentInstance;
fixture.detectChanges();
});
it('should create', () => {
expect(component).toBeTruthy();
});
});

