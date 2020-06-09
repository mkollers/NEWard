import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { ShellComponent } from './components/shell/shell.component';
import { SafePipe } from './pipes/safe.pipe';
import { OverlayImageDialogComponent } from './components/overlay-image-dialog/overlay-image-dialog.component';

@NgModule({
  declarations: [FooterComponent, HeaderComponent, ShellComponent, SafePipe, OverlayImageDialogComponent],
  exports: [SafePipe, ShellComponent],
  imports: [
    CommonModule,
    RouterModule,

    // Material
    MatButtonModule,
    MatIconModule
  ],
  providers: [
    { provide: 'WINDOW', useValue: window },
    { provide: 'LOCATION', useValue: location }
  ]
})
export class LayoutModule { }
