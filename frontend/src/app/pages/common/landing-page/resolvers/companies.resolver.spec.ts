import { CompanyMock } from '@shared/data-access/models/company.mock';
import { CompanyService } from '@shared/data-access/services/company.service';
import { of, throwError } from 'rxjs';
import { instance, mock } from 'ts-mockito';

import { CompaniesResolver } from './companies.resolver';

describe('CompaniesResolver', () => {
    let companyService: CompanyService;
    let resolver: CompaniesResolver;

    beforeEach(() => {
        const companyServiceMock = mock<CompanyService>();

        companyService = instance(companyServiceMock);
        resolver = new CompaniesResolver(companyService);
    });

    it('should be created', () => {
        expect(resolver).toBeTruthy();
    });

    it('should load companies once', async () => {
        // Arrange
        const expected = [new CompanyMock(), new CompanyMock(), new CompanyMock()];
        spyOn(companyService, 'getAll').and.returnValue(of(expected));

        // Act
        const result = await resolver.resolve();

        // Assert
        expect(result).toEqual(expected);
    });

    it('should return null and log error', async () => {
        // Arrange
        const err = 'Hard disk rotates in the wrong direction';
        spyOn(companyService, 'getAll').and.returnValue(throwError(err));
        spyOn(console, 'error').and.stub();

        // Act
        const result = await resolver.resolve();

        // Assert
        expect(result).toEqual(null);
        expect(console.error).toHaveBeenCalledWith(err);
    });
});
