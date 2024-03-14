import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Leave_ApprovalComponent } from './Leave_Approval.component';
describe('Leave_ApprovalComponent', () => {
let component: Leave_ApprovalComponent;
let fixture: ComponentFixture<Leave_ApprovalComponent>;
beforeEach(async(() => {
TestBed.configureTestingModule({
declarations: [ Leave_ApprovalComponent ]
})
.compileComponents();
}));
beforeEach(() => {
fixture = TestBed.createComponent(Leave_ApprovalComponent);
component = fixture.componentInstance;
fixture.detectChanges();
});
it('should create', () => {
expect(component).toBeTruthy();
});
});

