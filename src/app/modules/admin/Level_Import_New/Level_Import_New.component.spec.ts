import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Level_Import_NewComponent } from './Level_Import_New.component';
describe('Level_Import_NewComponent', () => {
let component: Level_Import_NewComponent;
let fixture: ComponentFixture<Level_Import_NewComponent>;
beforeEach(async(() => {
TestBed.configureTestingModule({
declarations: [ Level_Import_NewComponent ]
})
.compileComponents();
}));
beforeEach(() => {
fixture = TestBed.createComponent(Level_Import_NewComponent);
component = fixture.componentInstance;
fixture.detectChanges();
});
it('should create', () => {
expect(component).toBeTruthy();
});
});

