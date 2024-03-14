import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {Payment_ReportComponent } from './Payment_Report.component';
describe('Payment_ReportComponent', () => {
let component:Payment_ReportComponent;
let fixture: ComponentFixture<Payment_ReportComponent>;
beforeEach(async(() => {
TestBed.configureTestingModule({
declarations: [Payment_ReportComponent ]
})
.compileComponents();
}));
beforeEach(() => {
fixture = TestBed.createComponent(Payment_ReportComponent);
component = fixture.componentInstance;
fixture.detectChanges();
});
it('should create', () => {
expect(component).toBeTruthy();
});
});

