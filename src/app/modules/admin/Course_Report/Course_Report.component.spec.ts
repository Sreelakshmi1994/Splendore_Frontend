import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Course_ReportComponent } from './Course_Report.component';
describe('Course_ReportComponent', () => {
let component: Course_ReportComponent;
let fixture: ComponentFixture<Course_ReportComponent>;
beforeEach(async(() => {
TestBed.configureTestingModule({
declarations: [ Course_ReportComponent ]
})
.compileComponents();
}));
beforeEach(() => {
fixture = TestBed.createComponent(Course_ReportComponent);
component = fixture.componentInstance;
fixture.detectChanges();
});
it('should create', () => {
expect(component).toBeTruthy();
});
});

