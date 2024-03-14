import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Employee_AttendanceComponent } from './Employee_Attendance.component';
describe('Employee_AttendanceComponent', () => {
let component: Employee_AttendanceComponent;
let fixture: ComponentFixture<Employee_AttendanceComponent>;
beforeEach(async(() => {
TestBed.configureTestingModule({
declarations: [ Employee_AttendanceComponent ]
})
.compileComponents();
}));
beforeEach(() => {
fixture = TestBed.createComponent(Employee_AttendanceComponent);
component = fixture.componentInstance;
fixture.detectChanges();
});
it('should create', () => {
expect(component).toBeTruthy();
});
});

