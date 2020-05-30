import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Inject, Injectable, Optional } from '@angular/core';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { Request } from 'express';

/*
* This interceptor adds the host to relative paths. For example, when the app is loading
* an SVG with the help of the MatIconRegistry, the path is relative to the current host url
* (for example /assets/icons/custom/vertical.svg), which in case of server side rendering is
* unknown. That's the reason, why this interceptor adds the full path, including protocol and
* host, in case of running on the server side. If the codeis executed on the server side can be
* identified, whether a express-request is injected into the constructor.
*/
@Injectable()
export class UniversalInterceptor implements HttpInterceptor {

    constructor(@Optional() @Inject(REQUEST) protected request?: Request) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        let serverReq: HttpRequest<any> = req;
        if (this.request) {
            // It is required to use `get('host)` because this also includes the port.
            let newUrl = `${this.request.protocol}://${this.request.get('host')}`;
            if (!req.url.startsWith('/')) {
                newUrl += '/';
            }
            newUrl += req.url;
            serverReq = req.clone({ url: newUrl });
        }
        return next.handle(serverReq);
    }
}