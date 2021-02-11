import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddBankAccountPage } from './add-bank-account.page';

describe('AddBankAccountPage', () => {
  let component: AddBankAccountPage;
  let fixture: ComponentFixture<AddBankAccountPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBankAccountPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddBankAccountPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
