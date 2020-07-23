import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { IsTerminatedPipe } from './pipes/is-terminated.pipe';

@NgModule({
  declarations: [IsTerminatedPipe],
  exports: [IsTerminatedPipe],
  imports: [
    CommonModule
  ]
})
export class HelperModule { }
