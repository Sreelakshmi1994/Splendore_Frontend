import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BatchComponent } from './Batch.component';
describe('BatchComponent', () => {
let component: BatchComponent;
let fixture: ComponentFixture<BatchComponent>;
beforeEach(async(() => {
TestBed.configureTestingModule({
declarations: [ BatchComponent ]
})
.compileComponents();
}));
beforeEach(() => {
fixture = TestBed.createComponent(BatchComponent);
component = fixture.componentInstance;
fixture.detectChanges();
});
it('should create', () => {
expect(component).toBeTruthy();
});
});

