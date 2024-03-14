import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Level_ImportComponent } from './Level_Import.component';
describe('Level_ImportComponent', () => {
let component: Level_ImportComponent;
let fixture: ComponentFixture<Level_ImportComponent>;
beforeEach(async(() => {
TestBed.configureTestingModule({
declarations: [ Level_ImportComponent ]
})
.compileComponents();
}));
beforeEach(() => {
fixture = TestBed.createComponent(Level_ImportComponent);
component = fixture.componentInstance;
fixture.detectChanges();
});
it('should create', () => {
expect(component).toBeTruthy();
});
});

