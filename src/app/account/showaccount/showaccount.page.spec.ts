import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ShowaccountPage } from './showaccount.page';

describe('ShowaccountPage', () => {
  let component: ShowaccountPage;
  let fixture: ComponentFixture<ShowaccountPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowaccountPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ShowaccountPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
