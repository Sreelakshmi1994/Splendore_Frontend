import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {Receipt_ReportComponent } from './Receipt_Report.component';
describe('Receipt_ReportComponent', () => {
let component:Receipt_ReportComponent;
let fixture: ComponentFixture<Receipt_ReportComponent>;
beforeEach(async(() => {
TestBed.configureTestingModule({
declarations: [Receipt_ReportComponent ]
})
.compileComponents();
}));
beforeEach(() => {
fixture = TestBed.createComponent(Receipt_ReportComponent);
component = fixture.componentInstance;
fixture.detectChanges();
});
it('should create', () => {
expect(component).toBeTruthy();
});
});

