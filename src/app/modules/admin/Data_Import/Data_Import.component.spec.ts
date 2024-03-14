import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Data_ImportComponent } from './Data_Import.component';
describe('Data_ImportComponent', () => {
let component: Data_ImportComponent;
let fixture: ComponentFixture<Data_ImportComponent>;
beforeEach(async(() => {
TestBed.configureTestingModule({
declarations: [ Data_ImportComponent ]
})
.compileComponents();
}));
beforeEach(() => {
fixture = TestBed.createComponent(Data_ImportComponent);
component = fixture.componentInstance;
fixture.detectChanges();
});
it('should create', () => {
expect(component).toBeTruthy();
});
});

