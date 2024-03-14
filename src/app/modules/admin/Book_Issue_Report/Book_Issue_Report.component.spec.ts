import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Book_Issue_ReportComponent } from './Book_Issue_Report.component';
describe('Book_Issue_ReporttComponent', () => {
let component: Book_Issue_ReportComponent;
let fixture: ComponentFixture<Book_Issue_ReportComponent>;
beforeEach(async(() => {
TestBed.configureTestingModule({
declarations: [ Book_Issue_ReportComponent ]
})
.compileComponents();
}));
beforeEach(() => {
fixture = TestBed.createComponent(Book_Issue_ReportComponent);
component = fixture.componentInstance;
fixture.detectChanges();
});
it('should create', () => {
expect(component).toBeTruthy();
});
});

