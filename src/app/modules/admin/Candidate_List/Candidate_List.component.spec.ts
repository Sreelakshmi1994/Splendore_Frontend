import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Candidate_ListComponent } from './Candidate_List.component';
describe('Candidate_ListComponent', () => {
let component: Candidate_ListComponent;
let fixture: ComponentFixture<Candidate_ListComponent>;
beforeEach(async(() => {
TestBed.configureTestingModule({
declarations: [ Candidate_ListComponent ]
})
.compileComponents();
}));
beforeEach(() => {
fixture = TestBed.createComponent(Candidate_ListComponent);
component = fixture.componentInstance;
fixture.detectChanges();
});
it('should create', () => {
expect(component).toBeTruthy();
});
});

