import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Process_TypeComponent } from './Process_Type.component';
describe('Process_TypeComponent', () => {
let component: Process_TypeComponent;
let fixture: ComponentFixture<Process_TypeComponent>;
beforeEach(async(() => {
TestBed.configureTestingModule({
declarations: [ Process_TypeComponent ]
})
.compileComponents();
}));
beforeEach(() => {
fixture = TestBed.createComponent(Process_TypeComponent);
component = fixture.componentInstance;
fixture.detectChanges();
});
it('should create', () => {
expect(component).toBeTruthy();
});
});

