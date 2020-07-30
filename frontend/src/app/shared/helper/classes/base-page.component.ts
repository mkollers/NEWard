import { Directive, Inject, INJECTOR, Injector, OnDestroy } from '@angular/core';
import { HeaderService } from '@shared/layout/services/header.service';

@Directive()
// tslint:disable-next-line: directive-class-suffix
export class BasePageComponent implements OnDestroy {
    protected headerService: HeaderService;

    constructor(@Inject(INJECTOR) protected injector: Injector) {
        this.headerService = this.injector.get(HeaderService);
    }

    set navigateBackUri(value: string | any[]) {
        this.headerService.navigateBackUri = value;
    }

    set fragment(value: string) {
        this.headerService.fragment = value;
    }

    ngOnDestroy() {
        this.navigateBackUri = '';
        this.fragment = '';
    }
}