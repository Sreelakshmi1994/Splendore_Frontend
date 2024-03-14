import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Salary_Calculation_MasterComponent } from './Salary_Calculation_Master.component';
describe('Salary_Calculation_MasterComponent', () => {
let component: Salary_Calculation_MasterComponent;
let fixture: ComponentFixture<Salary_Calculation_MasterComponent>;
beforeEach(async(() => {
TestBed.configureTestingModule({
declarations: [ Salary_Calculation_MasterComponent ]
})
.compileComponents();
}));
beforeEach(() => {
fixture = TestBed.createComponent(Salary_Calculation_MasterComponent);
component = fixture.componentInstance;
fixture.detectChanges();
});
it('should create', () => {
expect(component).toBeTruthy();
});
});

