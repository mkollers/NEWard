import { Inject, INJECTOR, Injector, OnDestroy } from '@angular/core';
import { HeaderService } from '@shared/layout/services/header.service';

export class BasePageComponent implements OnDestroy {
    protected headerService: HeaderService;

    constructor(@Inject(INJECTOR) protected injector: Injector) {
        this.headerService = this.injector.get(HeaderService);
    }

    set navigateBackUri(value: string | any[]) {
        this.headerService.navigateBackUri = value;
    }

    ngOnDestroy() {
        this.navigateBackUri = '';
    }
}