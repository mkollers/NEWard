import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { UniversalInterceptor } from '@shared/helper/interceptors/universal.interceptor';

import { AppComponent } from './app.component';
import { AppModule } from './app.module';

@NgModule({
  imports: [
    AppModule,
    ServerModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: UniversalInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppServerModule { }
