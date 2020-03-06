import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FamilymanagementPage } from './familymanagement.page';

describe('FamilymanagementPage', () => {
  let component: FamilymanagementPage;
  let fixture: ComponentFixture<FamilymanagementPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FamilymanagementPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FamilymanagementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
