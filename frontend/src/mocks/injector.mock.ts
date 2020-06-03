import { Injector, Type } from '@angular/core';
import { instance, mock, when } from 'ts-mockito';

export class InjectorMock {
    static create = (...values: [Type<any>, any][]): Injector => {
        const injectorMock = mock<Injector>();
        for (const tuple of values) {
            const token = tuple[0];
            const value = tuple[1];
            when(injectorMock.get(token)).thenReturn(value);
        }
        return instance(injectorMock);
    }
}