import { MatDialogRef } from '@angular/material/dialog';
import * as faker from 'faker';
import { instance, mock } from 'ts-mockito';

import { OverlayImageDialogComponent } from './overlay-image-dialog.component';

describe('OverlayImageDialogComponent', () => {
  it('should create', () => {
    // Arrange
    const dialogrefMock = mock<MatDialogRef<OverlayImageDialogComponent>>();
    const dialogref = instance(dialogrefMock);

    // Act
    const component = new OverlayImageDialogComponent(dialogref, faker.internet.url());

    // Assert
    expect(component).toBeTruthy();
  });
});
