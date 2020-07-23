import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { AuthModule } from '@shared/auth/auth.module';
import { HelperModule } from '@shared/helper/helper.module';

import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { NoShellComponent } from './components/no-shell/no-shell.component';
import { OverlayImageDialogComponent } from './components/overlay-image-dialog/overlay-image-dialog.component';
import { ShellComponent } from './components/shell/shell.component';
import { SafePipe } from './pipes/safe.pipe';

@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    ShellComponent,
    SafePipe,
    OverlayImageDialogComponent,
    NoShellComponent
  ],
  exports: [SafePipe, NoShellComponent, ShellComponent],
  imports: [
    CommonModule,
    RouterModule,

    // Material
    MatButtonModule,
    MatIconModule,

    // Custom
    AuthModule,
    HelperModule
  ],
  providers: [
    { provide: 'WINDOW', useValue: window },
    { provide: 'LOCATION', useValue: location }
  ]
})
export class LayoutModule { }
