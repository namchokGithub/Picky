import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EnterprisemanagementPage } from './enterprisemanagement.page';

describe('EnterprisemanagementPage', () => {
  let component: EnterprisemanagementPage;
  let fixture: ComponentFixture<EnterprisemanagementPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnterprisemanagementPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EnterprisemanagementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
