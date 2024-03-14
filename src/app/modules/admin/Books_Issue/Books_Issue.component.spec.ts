import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Books_IssueComponent } from './Books_Issue.component';
describe('Books_IssueComponent', () => {
let component: Books_IssueComponent;
let fixture: ComponentFixture<Books_IssueComponent>;
beforeEach(async(() => {
TestBed.configureTestingModule({
declarations: [ Books_IssueComponent ]
})
.compileComponents();
}));
beforeEach(() => {
fixture = TestBed.createComponent(Books_IssueComponent);
component = fixture.componentInstance;
fixture.detectChanges();
});
it('should create', () => {
expect(component).toBeTruthy();
});
});

