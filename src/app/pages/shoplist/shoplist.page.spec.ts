import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ShoplistPage } from './shoplist.page';

describe('ShoplistPage', () => {
  let component: ShoplistPage;
  let fixture: ComponentFixture<ShoplistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ShoplistPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ShoplistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
