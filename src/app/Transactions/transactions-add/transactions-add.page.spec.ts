import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

<<<<<<< HEAD:src/app/Transactions/transactions-add/transactions-add.page.spec.ts
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
=======
import { ListTransactionsPage } from './list-transactions.page';

describe('ListTransactionsPage', () => {
  let component: ListTransactionsPage;
  let fixture: ComponentFixture<ListTransactionsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListTransactionsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListTransactionsPage);
>>>>>>> origin/Jutamas:src/app/Transactions/transactions-add/list-transactions/list-transactions.page.spec.ts
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
