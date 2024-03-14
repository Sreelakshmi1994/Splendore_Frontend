import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Application_CourseComponent } from './Application_Course.component';
describe('Application_CourseComponent', () => {
let component: Application_CourseComponent;
let fixture: ComponentFixture<Application_CourseComponent>;
beforeEach(async(() => {
TestBed.configureTestingModule({
declarations: [ Application_CourseComponent ]
})
.compileComponents();
}));
beforeEach(() => {
fixture = TestBed.createComponent(Application_CourseComponent);
component = fixture.componentInstance;
fixture.detectChanges();
});
it('should create', () => {
expect(component).toBeTruthy();
});
});

