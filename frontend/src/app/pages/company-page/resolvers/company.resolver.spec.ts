import { ActivatedRouteSnapshot } from '@angular/router';
import { CompanyMock } from '@shared/data-access/models/company.mock';
import { CompanyService } from '@shared/data-access/services/company.service';
import { of, throwError } from 'rxjs';
import { instance, mock, when } from 'ts-mockito';

import { CompanyResolver } from './company.resolver';

describe('CompanyResolver', () => {
    let companyService: CompanyService;
    let resolver: CompanyResolver;
    let routeMock: ActivatedRouteSnapshot;

    beforeEach(() => {
        const companyServiceMock = mock<CompanyService>();
        routeMock = mock<ActivatedRouteSnapshot>();
        when(routeMock.parent).thenReturn({ params: { id: '42' } } as unknown as ActivatedRouteSnapshot);

        companyService = instance(companyServiceMock);
        resolver = new CompanyResolver(companyService);
    });

    it('should be created', () => {
        expect(resolver).toBeTruthy();
    });

    it('should load the company once', async () => {
        // Arrange
        const expected = new CompanyMock();
        spyOn(companyService, 'getById').and.returnValue(of(expected));
        when(routeMock.parent).thenReturn({ params: { id: '42' } } as unknown as ActivatedRouteSnapshot);
        const route = instance(routeMock);

        // Act
        const result = await resolver.resolve(route);

        // Assert
        expect(companyService.getById).toHaveBeenCalledWith('42');
        expect(result).toEqual(expected);
    });

    it('should return null because of missing id', async () => {
        // Arrange
        when(routeMock.parent).thenReturn(null as unknown as ActivatedRouteSnapshot);
        const route = instance(routeMock);

        // Act
        const result = await resolver.resolve(route);

        // Assert
        expect(result).toEqual(null);
    });

    it('should return null and log error', async () => {
        // Arrange
        const err = 'Hard disk rotates in the wrong direction';
        spyOn(companyService, 'getById').and.returnValue(throwError(err));
        spyOn(console, 'error').and.stub();
        when(routeMock.parent).thenReturn({ params: { id: '42' } } as unknown as ActivatedRouteSnapshot);
        const route = instance(routeMock);

        // Act
        const result = await resolver.resolve(route);

        // Assert
        expect(result).toEqual(null);
        expect(console.error).toHaveBeenCalledWith(err);
    });
});
