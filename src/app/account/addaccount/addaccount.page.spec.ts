import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddaccountPage } from './addaccount.page';

describe('AddaccountPage', () => {
  let component: AddaccountPage;
  let fixture: ComponentFixture<AddaccountPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddaccountPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddaccountPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
