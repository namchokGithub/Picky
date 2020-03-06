import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TransactionsAddPage } from './transactions-add.page';

describe('TransactionsAddPage', () => {
  let component: TransactionsAddPage;
  let fixture: ComponentFixture<TransactionsAddPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionsAddPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TransactionsAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
