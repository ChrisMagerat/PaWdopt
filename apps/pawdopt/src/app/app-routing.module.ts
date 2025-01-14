import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'signup',
    loadChildren: () =>
      import('@pawdopt/mobile/signup/feature').then(
        (m) => m.SignupPageComponentModule
      ),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('@pawdopt/mobile/login/feature').then(
        (m) => m.LoginPageComponentModule
      )
  },
  {
    path: 'addorg',
    loadChildren: () =>
      import('@pawdopt/mobile/addorg/feature').then(
        (m) => m.AddorgPageComponentModule
      )
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('@pawdopt/mobile/dashboard/feature').then(
        (m) => m.dashboardPageComponentModule
      )
  },
  {
    path: 'adddog',
    loadChildren: () =>
      import('@pawdopt/mobile/adddog/feature').then(
        (m) => m.AdddogPageComponentModule
      )
  },
  {
    path: 'uikit',
    loadChildren: () =>
      import('@pawdopt/mobile/uikit/feature').then(
        (m) => m.uikitPageComponentModule
      )
  },
  {
    path: 'userlikes',
    loadChildren: () =>
      import('@pawdopt/mobile/userlikes/feature').then(
        (m) => m.userlikesPageComponentModule
      )
  },
  {
    path: 'owneddogs',
    loadChildren: () =>
      import('@pawdopt/mobile/owneddogs/feature').then(
        (m) => m.owneddogsPageComponentModule
      )
  },
  {
    path: 'updateorremovedog',
    loadChildren: () =>
      import('@pawdopt/mobile/updateorremovedog/feature').then(
        (m) => m.updateorremovedogPageComponentModule
      )
  },
  {
    path: 'userinfo',
    loadChildren: () =>
      import('@pawdopt/mobile/userinfo/feature').then(
        (m) => m.userinfoPageComponentModule
      )
  },
  {
    path: 'userprofile',
    loadChildren: () =>
      import('@pawdopt/mobile/userprofile/feature').then(
        (m) => m.userprofilePageComponentModule
      )
  },
  {
    path: 'adoptionprocess',
    loadChildren: () =>
      import('@pawdopt/mobile/adoptionprocess/feature').then(
        (m) => m.adoptionprocessPageComponentModule
      )
  },
  {
    path: 'orgprofile',
    loadChildren: () =>
      import('@pawdopt/mobile/orgprofile/feature').then(
        (m) => m.orgprofilePageComponentModule
      )
  },
  {
    path: 'appointmentpage',
    loadChildren: () =>
      import('@pawdopt/mobile/appointmentpage/feature').then(
        (m) => m.appointmentpagePageComponentModule
      )
  },
  {
    path: 'chat',
    loadChildren: () =>
      import('@pawdopt/mobile/chat/feature').then(
        (m) => m.chatPageComponentModule
      )
  },
  {
    path: 'uploaddoc',
    loadChildren: () =>
      import('@pawdopt/mobile/uploaddoc/feature').then(
        (m) => m.uploaddocPageComponentModule
      )
  },
  {
    path: 'useradoption',
    loadChildren: () =>
      import('@pawdopt/mobile/useradoption/feature').then(
        (m) => m.useradoptionPageComponentModule
      )
    },
    {
    path: 'preferences',
    loadChildren: () =>
      import('@pawdopt/mobile/preferences/feature').then(
        (m) => m.PreferencesPageComponentModule
      )
    },
    {
    path: 'orgsettings',
    loadChildren: () =>
      import('@pawdopt/mobile/orgsettings/feature').then(
        (m) => m.OrgSettingsPageComponentModule
      )
    },
    {
      path: 'chatlist',
      loadChildren: () =>
        import('@pawdopt/mobile/chatlist/feature').then(
          (m) => m.chatlistPageComponentModule
        )
    }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
