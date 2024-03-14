import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Book_Return_ReportComponent } from './Book_Return_Report.component';
describe('Book_Return_ReporttComponent', () => {
let component: Book_Return_ReportComponent;
let fixture: ComponentFixture<Book_Return_ReportComponent>;
beforeEach(async(() => {
TestBed.configureTestingModule({
declarations: [ Book_Return_ReportComponent ]
})
.compileComponents();
}));
beforeEach(() => {
fixture = TestBed.createComponent(Book_Return_ReportComponent);
component = fixture.componentInstance;
fixture.detectChanges();
});
it('should create', () => {
expect(component).toBeTruthy();
});
});

