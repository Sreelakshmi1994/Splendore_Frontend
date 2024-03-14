import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Payment_ApprovalComponent } from './Payment_Approval.component';
describe('Payment_ApprovalComponent', () => {
let component: Payment_ApprovalComponent;
let fixture: ComponentFixture<Payment_ApprovalComponent>;
beforeEach(async(() => {
TestBed.configureTestingModule({
declarations: [ Payment_ApprovalComponent ]
})
.compileComponents();
}));
beforeEach(() => {
fixture = TestBed.createComponent(Payment_ApprovalComponent);
component = fixture.componentInstance;
fixture.detectChanges();
});
it('should create', () => {
expect(component).toBeTruthy();
});
});

