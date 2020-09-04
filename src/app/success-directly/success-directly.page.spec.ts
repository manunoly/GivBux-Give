import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SuccessDirectlyPage } from './success-directly.page';

describe('SuccessDirectlyPage', () => {
  let component: SuccessDirectlyPage;
  let fixture: ComponentFixture<SuccessDirectlyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuccessDirectlyPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SuccessDirectlyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
