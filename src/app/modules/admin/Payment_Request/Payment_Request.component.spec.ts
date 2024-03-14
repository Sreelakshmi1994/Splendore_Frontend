import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Payment_RequestComponent } from './Payment_Request.component';
describe('Payment_RequestComponent', () => {
let component: Payment_RequestComponent;
let fixture: ComponentFixture<Payment_RequestComponent>;
beforeEach(async(() => {
TestBed.configureTestingModule({
declarations: [ Payment_RequestComponent ]
})
.compileComponents();
}));
beforeEach(() => {
fixture = TestBed.createComponent(Payment_RequestComponent);
component = fixture.componentInstance;
fixture.detectChanges();
});
it('should create', () => {
expect(component).toBeTruthy();
});
});

