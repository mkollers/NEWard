import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverlayImageDialogComponent } from './overlay-image-dialog.component';

describe('OverlayImageDialogComponent', () => {
  let component: OverlayImageDialogComponent;
  let fixture: ComponentFixture<OverlayImageDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverlayImageDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverlayImageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
