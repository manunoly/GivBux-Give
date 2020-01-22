import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DonateDirectlyPage } from './donate-directly.page';

describe('DonateDirectlyPage', () => {
  let component: DonateDirectlyPage;
  let fixture: ComponentFixture<DonateDirectlyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonateDirectlyPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DonateDirectlyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
