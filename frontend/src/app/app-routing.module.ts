import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoShellComponent } from '@shared/layout/components/no-shell/no-shell.component';
import { ShellComponent } from '@shared/layout/components/shell/shell.component';

const routes: Routes = [
  {
    path: 'signin-callback',
    component: NoShellComponent,
    loadChildren: () => import('./pages/auth/signin-callback-page/signin-callback-page.module').then(m => m.SigninCallbackPageModule)
  },
  {
    path: '',
    component: ShellComponent,
    loadChildren: () => import('./pages/common/landing-page/landing-page.module').then(m => m.LandingPageModule)
  },
  {
    path: 'aufsteiger-des-jahres/:id',
    component: ShellComponent,
    loadChildren: () => import('./pages/company-page/company-page.module').then(m => m.CompanyPageModule)
  },
  {
    path: 'produktneuheit-des-jahres/:id',
    component: ShellComponent,
    loadChildren: () => import('./pages/product-page/product-page.module').then(m => m.ProductPageModule)
  },
  {
    path: 'datenschutz',
    component: ShellComponent,
    loadChildren: () => import('./pages/common/privacy-page/privacy-page.module').then(m => m.PrivacyPageModule)
  },
  { path: '**', redirectTo: '' }
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
