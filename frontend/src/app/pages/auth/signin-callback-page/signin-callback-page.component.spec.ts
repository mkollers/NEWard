import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SigninCallbackPageComponent } from './signin-callback-page.component';

describe('SigninCallbackPageComponent', () => {
  let component: SigninCallbackPageComponent;
  let fixture: ComponentFixture<SigninCallbackPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SigninCallbackPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SigninCallbackPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
