import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Application_UniversityComponent } from './Application_University.component';
describe('Application_UniversityComponent', () => {
let component: Application_UniversityComponent;
let fixture: ComponentFixture<Application_UniversityComponent>;
beforeEach(async(() => {
TestBed.configureTestingModule({
declarations: [ Application_UniversityComponent ]
})
.compileComponents();
}));
beforeEach(() => {
fixture = TestBed.createComponent(Application_UniversityComponent);
component = fixture.componentInstance;
fixture.detectChanges();
});
it('should create', () => {
expect(component).toBeTruthy();
});
});

