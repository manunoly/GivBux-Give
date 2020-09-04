import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewMorePage } from './view-more.page';

describe('ViewMorePage', () => {
  let component: ViewMorePage;
  let fixture: ComponentFixture<ViewMorePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewMorePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewMorePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
