import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalPagePage } from './modal-page.page';

describe('ModalPagePage', () => {
  let component: ModalPagePage;
  let fixture: ComponentFixture<ModalPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalPagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
