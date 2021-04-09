import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GiveCompleteProcessPage } from './give-complete-process.page';

describe('GiveCompleteProcessPage', () => {
  let component: GiveCompleteProcessPage;
  let fixture: ComponentFixture<GiveCompleteProcessPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GiveCompleteProcessPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GiveCompleteProcessPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
