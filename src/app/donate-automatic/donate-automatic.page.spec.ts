import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DonateAutomaticPage } from './donate-automatic.page';

describe('DonateAutomaticPage', () => {
  let component: DonateAutomaticPage;
  let fixture: ComponentFixture<DonateAutomaticPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonateAutomaticPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DonateAutomaticPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
