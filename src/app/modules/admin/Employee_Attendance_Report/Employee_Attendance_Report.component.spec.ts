import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Employee_Attendance_ReportComponent } from './Employee_Attendance_Report.component';
describe('Employee_Attendance_ReportComponent', () => {
let component: Employee_Attendance_ReportComponent;
let fixture: ComponentFixture<Employee_Attendance_ReportComponent>;
beforeEach(async(() => {
TestBed.configureTestingModule({
declarations: [ Employee_Attendance_ReportComponent ]
})
.compileComponents();
}));
beforeEach(() => {
fixture = TestBed.createComponent(Employee_Attendance_ReportComponent);
component = fixture.componentInstance;
fixture.detectChanges();
});
it('should create', () => {
expect(component).toBeTruthy();
});
});

