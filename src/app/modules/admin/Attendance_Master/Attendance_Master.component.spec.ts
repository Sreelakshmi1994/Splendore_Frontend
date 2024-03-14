import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Attendance_MasterComponent } from './Attendance_Master.component';
describe('Attendance_MasterComponent', () => {
let component: Attendance_MasterComponent;
let fixture: ComponentFixture<Attendance_MasterComponent>;
beforeEach(async(() => {
TestBed.configureTestingModule({
declarations: [ Attendance_MasterComponent ]
})
.compileComponents();
}));
beforeEach(() => {
fixture = TestBed.createComponent(Attendance_MasterComponent);
component = fixture.componentInstance;
fixture.detectChanges();
});
it('should create', () => {
expect(component).toBeTruthy();
});
});

