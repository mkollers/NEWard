import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Request } from 'express';
import { of } from 'rxjs';
import { instance, mock, when } from 'ts-mockito';

import { UniversalInterceptor } from './universal.interceptor';

describe('UniversalInterceptor', () => {
    describe('executed on the server side', () => {
        let interceptor: UniversalInterceptor;
        let request: Request;

        beforeEach(() => {
            const requestMock = mock<Request>();

            when(requestMock.protocol).thenReturn('https');
            when(requestMock.host).thenReturn('helpdesk.vertical.de');
            when(requestMock.get('host')).thenReturn('helpdesk.vertical.de');

            request = instance(requestMock);
            interceptor = new UniversalInterceptor(request);
        });

        it('should add protocol and host', () => {
            // Arrange
            const url = '/assets/icons/custom/vertical.svg';
            let req = new HttpRequest<any>(
                'GET', url
            );
            const nextMock = mock<HttpHandler>();
            const next = instance(nextMock);
            spyOn(next, 'handle').and.callFake(value => {
                req = value;
                return of(undefined as unknown as HttpEvent<any>);
            });

            // Act
            interceptor.intercept(req, next);

            // Assert
            expect(req.url).toBe(`${request.protocol}://${request.host}${url}`);
        });

        it('should add a leading slash and protocol and host', () => {
            // Arrange
            const url = 'assets/icons/custom/vertical.svg';
            let req = new HttpRequest<any>(
                'GET', url
            );
            const nextMock = mock<HttpHandler>();
            const next = instance(nextMock);
            spyOn(next, 'handle').and.callFake(value => {
                req = value;
                return of(undefined as unknown as HttpEvent<any>);
            });

            // Act
            interceptor.intercept(req, next);

            // Assert
            expect(req.url).toBe(`${request.protocol}://${request.host}/${url}`);
        });
    });

    describe('executed on the client side', () => {
        let interceptor: UniversalInterceptor;

        beforeEach(() => interceptor = new UniversalInterceptor());

        it('should create', () => expect(interceptor).toBeTruthy());

        it('should still work with relative uris', () => {
            // Arrange
            const url = '/assets/icons/custom/vertical.svg';
            const req = new HttpRequest<any>(
                'GET', url
            );
            const nextMock = mock<HttpHandler>();
            const next = instance(nextMock);
            spyOn(next, 'handle').and.stub();

            // Act
            interceptor.intercept(req, next);

            // Assert
            expect(req.url).toBe(url);
            expect(next.handle).toHaveBeenCalledWith(req);
        });
    });

    describe('localhost with special port', () => {
        let interceptor: UniversalInterceptor;
        let request: Request;

        beforeEach(() => {
            const requestMock = mock<Request>();

            when(requestMock.protocol).thenReturn('http');
            when(requestMock.host).thenReturn('localhost');
            when(requestMock.get('host')).thenReturn('localhost:4200');

            request = instance(requestMock);
            interceptor = new UniversalInterceptor(request);
        });

        it('should add protocol and host', () => {
            // Arrange
            const url = '/assets/icons/custom/vertical.svg';
            let req = new HttpRequest<any>(
                'GET', url
            );
            const nextMock = mock<HttpHandler>();
            const next = instance(nextMock);
            spyOn(next, 'handle').and.callFake(value => {
                req = value;
                return of(undefined as unknown as HttpEvent<any>);
            });

            // Act
            interceptor.intercept(req, next);

            // Assert
            expect(req.url).toBe(`${request.protocol}://${request.get('host')}${url}`);
        });
    });
});