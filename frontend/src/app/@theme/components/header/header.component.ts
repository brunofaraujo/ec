import {Component, Input, OnInit} from '@angular/core';

import {NbMenuItem, NbMenuService, NbSidebarService} from '@nebular/theme';
import {UserService} from '../../../@core/data/users.service';
import {AnalyticsService} from '../../../@core/utils/analytics.service';
import {NbAuthJWTToken, NbAuthService} from '../../../@auth';
import {User} from '../../../@core/data/user';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {


  @Input() position = 'normal';

  user: User;
  userMenu: NbMenuItem[] = [
    {
      title: 'Profile',
      link: '/pages/user',
    },
    {
      title: 'Log out',
      link: '/auth/logout',
    },
  ];


  constructor(
    private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private userService: UserService,
    private analyticsService: AnalyticsService,
    private authService: NbAuthService,
  ) {

    this.authService.onTokenChange().subscribe((token: NbAuthJWTToken) => {
      if (token.isValid()) {
        this.user = token.getPayload();
      }
    });

  }

  ngOnInit() {
    this.userService.getProfile().subscribe(
      (data) => {
        return this.user = data
      },
    );
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    return false;
  }

  goToHome() {
    this.menuService.navigateHome();
  }

  startSearch() {
    this.analyticsService.trackEvent('startSearch');
  }
}
