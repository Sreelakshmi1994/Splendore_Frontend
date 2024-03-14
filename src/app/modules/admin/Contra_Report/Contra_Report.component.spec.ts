import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Contra_ReportComponent } from './Contra_Report.component';
describe('Contra_ReportComponent', () => {
let component: Contra_ReportComponent;
let fixture: ComponentFixture<Contra_ReportComponent>;
beforeEach(async(() => {
TestBed.configureTestingModule({
declarations: [ Contra_ReportComponent ]
})
.compileComponents();
}));
beforeEach(() => {
fixture = TestBed.createComponent(Contra_ReportComponent);
component = fixture.componentInstance;
fixture.detectChanges();
});
it('should create', () => {
expect(component).toBeTruthy();
});
});

