import { Injector } from '@angular/core';
import { HeaderService } from '@shared/layout/services/header.service';
import { instance, mock, when } from 'ts-mockito';

import { BasePageComponent } from './base-page.component';
import { InjectorMock } from 'src/mocks/injector.mock';

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

    it('ngOnDestroy should reset the navigate back uri', () => {
        // Arrange
        const headerService = new HeaderService();
        headerService.navigateBackUri = 'Schnitzel';
        const injector = InjectorMock.create([HeaderService, headerService]);
        const component = new BasePageComponent(injector);

        // Act
        component.ngOnDestroy();

        // Assert
        expect(headerService.navigateBackUri).toBe('');
    });
});
