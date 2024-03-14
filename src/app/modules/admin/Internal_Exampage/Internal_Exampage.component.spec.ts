import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Internal_ExampageComponent } from './Internal_Exampage.component';
describe('Internal_ExampageComponent', () => {
let component: Internal_ExampageComponent;
let fixture: ComponentFixture<Internal_ExampageComponent>;
beforeEach(async(() => {
TestBed.configureTestingModule({
declarations: [ Internal_ExampageComponent ]
})
.compileComponents();
}));
beforeEach(() => {
fixture = TestBed.createComponent(Internal_ExampageComponent);
component = fixture.componentInstance;
fixture.detectChanges();
});
it('should create', () => {
expect(component).toBeTruthy();
});
});

