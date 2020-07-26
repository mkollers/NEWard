import { Inject, Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { WINDOW } from '@shared/helper/injection-tokens/window.injection-token';
import { filter, tap } from 'rxjs/operators';

export interface GstWindow extends Window {
  dataLayer: any[] | undefined;
  gtag: ((...args: any[]) => void);
}

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  constructor(
    private _router: Router,
    @Inject(WINDOW) private _window: GstWindow
  ) { }

  enable() {
    this._injectScript();
    this._prepareApi();
    this._trackPageNavigation();
  }

  gtag(...args: any[]) {
    if (!this._window.gtag) return;
    this._window.gtag(...args);
  }

  private _injectScript() {
    const gst: HTMLScriptElement = this._window.document.createElement('script');
    gst.src = `https://www.googletagmanager.com/gtag/js?id=UA-122158272-9`;
    gst.async = true;

    this._window.document.body.appendChild(gst);
  }

  private _prepareApi() {
    const dataLayer = this._window.dataLayer = this._window.dataLayer || [];
    // It's required to define this without an arrow function, to have the right scope
    // tslint:disable-next-line:only-arrow-functions
    this._window.gtag = function() {
      dataLayer.push(arguments);
    };
    this.gtag('js', new Date());
  }

  /** subscribe to router events and send page views to Google Analytics */
  private _trackPageNavigation() {
    this._router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      tap((event: NavigationEnd) => this.gtag('config', 'UA-122158272-9', {
        page_path: event.urlAfterRedirects
      }))
    ).subscribe();
  }
}
