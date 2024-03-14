import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Agent_DetailsComponent } from './Agent_Details.component';
describe('Agent_DetailsComponent', () => {
let component: Agent_DetailsComponent;
let fixture: ComponentFixture<Agent_DetailsComponent>;
beforeEach(async(() => {
TestBed.configureTestingModule({
declarations: [ Agent_DetailsComponent ]
})
.compileComponents();
}));
beforeEach(() => {
fixture = TestBed.createComponent(Agent_DetailsComponent);
component = fixture.componentInstance;
fixture.detectChanges();
});
it('should create', () => {
expect(component).toBeTruthy();
});
});

