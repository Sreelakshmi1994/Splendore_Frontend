import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Journal_ReportComponent } from './Journal_Report.component';
describe('Journal_ReportComponent', () => {
let component: Journal_ReportComponent;
let fixture: ComponentFixture<Journal_ReportComponent>;
beforeEach(async(() => {
TestBed.configureTestingModule({
declarations: [ Journal_ReportComponent ]
})
.compileComponents();
}));
beforeEach(() => {
fixture = TestBed.createComponent(Journal_ReportComponent);
component = fixture.componentInstance;
fixture.detectChanges();
});
it('should create', () => {
expect(component).toBeTruthy();
});
});

