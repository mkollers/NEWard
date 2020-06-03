import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShellComponent } from '@shared/layout/components/shell/shell.component';

const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    loadChildren: () => import('./pages/common/landing-page/landing-page.module').then(m => m.LandingPageModule)
  },
  {
    path: 'datenschutz',
    component: ShellComponent,
    loadChildren: () => import('./pages/common/privacy-page/privacy-page.module').then(m => m.PrivacyPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    anchorScrolling: 'enabled',
    initialNavigation: 'enabled',
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
