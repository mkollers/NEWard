import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import localeDe from '@angular/common/locales/de';
import { LOCALE_ID, NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '@environments/environment';
import { WINDOW } from '@shared/helper/injection-tokens/window.injection-token';
import { LayoutModule } from '@shared/layout/layout.module';
import { TracingModule } from '@shared/tracing/tracing.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

registerLocaleData(localeDe, 'de');

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    HttpClientModule,

    // Firebase
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,

    // Custom
    LayoutModule,
    TracingModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'de-DE' },
    { provide: WINDOW, useValue: window }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
