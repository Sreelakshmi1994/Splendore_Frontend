import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Document_TypeComponent } from './Document_Type.component';
describe('Document_TypeComponent', () => {
let component: Document_TypeComponent;
let fixture: ComponentFixture<Document_TypeComponent>;
beforeEach(async(() => {
TestBed.configureTestingModule({
declarations: [ Document_TypeComponent ]
})
.compileComponents();
}));
beforeEach(() => {
fixture = TestBed.createComponent(Document_TypeComponent);
component = fixture.componentInstance;
fixture.detectChanges();
});
it('should create', () => {
expect(component).toBeTruthy();
});
});

