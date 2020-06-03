import { Injector } from '@angular/core';
import { HeaderService } from '@shared/layout/services/header.service';
import { instance, mock, when } from 'ts-mockito';

import { PrivacyPageComponent } from './privacy-page.component';

describe('PrivacyPageComponent', () => {
  it('should create', () => {
    // Arrange
    const injectorMock = mock<Injector>();
    const headerService = new HeaderService();
    when(injectorMock.get(HeaderService)).thenReturn(headerService);
    const injector = instance(injectorMock);

    // Act
    const component = new PrivacyPageComponent(injector);

    // Arrange
    expect(component).toBeTruthy();
  });
});
