import { Injector } from '@angular/core';
import { HeaderService } from '@shared/layout/services/header.service';
import { instance, mock, when } from 'ts-mockito';

import { BasePageComponent } from './base-page.component';

describe('BasePageComponent', () => {
    it('should create', () => {
        // Arrange
        const injectorMock = mock<Injector>();
        const headerService = new HeaderService();
        when(injectorMock.get<HeaderService>(HeaderService)).thenReturn(headerService);
        const injector = instance(injectorMock);

        // Act
        const component = new BasePageComponent(injector);

        // Assert
        expect(component).toBeTruthy();
    });
});
