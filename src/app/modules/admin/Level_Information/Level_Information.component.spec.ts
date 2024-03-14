import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Level_InformationComponent } from './Level_Information.component';
describe('Level_InformationComponent', () => {
let component: Level_InformationComponent;
let fixture: ComponentFixture<Level_InformationComponent>;
beforeEach(async(() => {
TestBed.configureTestingModule({
declarations: [ Level_InformationComponent ]
})
.compileComponents();
}));
beforeEach(() => {
fixture = TestBed.createComponent(Level_InformationComponent);
component = fixture.componentInstance;
fixture.detectChanges();
});
it('should create', () => {
expect(component).toBeTruthy();
});
});

