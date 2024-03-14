import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StudentMark_ReportComponent } from './StudentMark_Report.component';
describe('StudentMark_ReportComponent', () => {
let component: StudentMark_ReportComponent;
let fixture: ComponentFixture<StudentMark_ReportComponent>;
beforeEach(async(() => {
TestBed.configureTestingModule({
declarations: [ StudentMark_ReportComponent ]
})
.compileComponents();
}));
beforeEach(() => {
fixture = TestBed.createComponent(StudentMark_ReportComponent);
component = fixture.componentInstance;
fixture.detectChanges();
});
it('should create', () => {
expect(component).toBeTruthy();
});
});

