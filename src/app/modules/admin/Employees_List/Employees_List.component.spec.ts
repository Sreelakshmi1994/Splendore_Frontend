import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Employees_ListComponent } from './Employees_List.component';
describe('Employees_ListComponent', () => {
let component: Employees_ListComponent;
let fixture: ComponentFixture<Employees_ListComponent>;
beforeEach(async(() => {
TestBed.configureTestingModule({
declarations: [ Employees_ListComponent ]
})
.compileComponents();
}));
beforeEach(() => {
fixture = TestBed.createComponent(Employees_ListComponent);
component = fixture.componentInstance;
fixture.detectChanges();
});
it('should create', () => {
expect(component).toBeTruthy();
});
});

