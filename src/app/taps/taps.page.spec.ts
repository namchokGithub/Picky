import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TapsPage } from './taps.page';

describe('TapsPage', () => {
  let component: TapsPage;
  let fixture: ComponentFixture<TapsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TapsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TapsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
