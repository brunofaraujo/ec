import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NbAuthJWTToken, NbAuthModule, NbPasswordAuthStrategy} from '@nebular/auth';
import { NbSecurityModule, NbRoleProvider } from '@nebular/security';
import { of as observableOf } from 'rxjs';

import { throwIfAlreadyLoaded } from './module-import-guard';
import { DataModule } from './data/data.module';
import { AnalyticsService } from './utils/analytics.service';
import {RoleProvider} from '../role.provider';

const socialLinks = [
  {
    url: 'https://github.com/akveo/nebular',
    target: '_blank',
    icon: 'socicon-github',
  },
  {
    url: 'https://www.facebook.com/akveo/',
    target: '_blank',
    icon: 'socicon-facebook',
  },
  {
    url: 'https://twitter.com/akveo_inc',
    target: '_blank',
    icon: 'socicon-twitter',
  },
];

export const NB_CORE_PROVIDERS = [
  ...DataModule.forRoot().providers,
  ...NbAuthModule.forRoot({

    strategies: [
      NbPasswordAuthStrategy.setup({
        name: 'email',
        token: {
          class: NbAuthJWTToken,
          key: 'access_token',
        },
        baseEndpoint: 'http://localhost:8000',
        login: {
          endpoint: '/api/auth/login',
          method: 'post',
        },
        register: {
          endpoint: '/api/auth/register',
          method: 'post',
        },
        logout: {
          endpoint: '/api/auth/logout',
          method: 'post',
        },
        requestPass: {
          endpoint: '/api/auth/request-pass',
          method: 'post',
        },
        resetPass: {
          endpoint: '/api/auth/reset-pass',
          method: 'post',
        },
      }),
    ],
    forms: {},
  }).providers,

  NbSecurityModule.forRoot({
    accessControl: {
      guest: {
        view: ['news', 'comments'],
      },
      user: {
        parent: 'guest',
        create: 'comments',
      },
      moderator: {
        parent: 'user',
        create: 'news',
        remove: '*',
      },
    },
  }).providers,
  {
    provide: NbRoleProvider,
    useValue: {
      getRole: () => {
        return observableOf('guest');
      },
    },
  },
  {
    provide: NbRoleProvider, useClass: RoleProvider,
  },
  AnalyticsService,
];

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    NbAuthModule,
  ],
  declarations: [],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }

  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: CoreModule,
      providers: [
        ...NB_CORE_PROVIDERS,
      ],
    };
  }
}
