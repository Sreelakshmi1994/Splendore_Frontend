import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Leave_RequestComponent } from './Leave_Request.component';
describe('Leave_RequestComponent', () => {
let component: Leave_RequestComponent;
let fixture: ComponentFixture<Leave_RequestComponent>;
beforeEach(async(() => {
TestBed.configureTestingModule({
declarations: [ Leave_RequestComponent ]
})
.compileComponents();
}));
beforeEach(() => {
fixture = TestBed.createComponent(Leave_RequestComponent);
component = fixture.componentInstance;
fixture.detectChanges();
});
it('should create', () => {
expect(component).toBeTruthy();
});
});

