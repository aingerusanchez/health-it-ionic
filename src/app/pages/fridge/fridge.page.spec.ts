import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FridgePage } from './fridge.page';

describe('FridgePage', () => {
  let component: FridgePage;
  let fixture: ComponentFixture<FridgePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FridgePage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FridgePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
