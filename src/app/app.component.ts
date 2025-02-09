import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ChildActivationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { UserService } from './auth/services/user.service';
import { MarketService } from './market/services/market.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    title = 'data-trader-web';
    constructor(
        public router: Router, 
        private titleService: Title,
        private userService: UserService,
        private marketService: MarketService
        ) {
        this.router.events
            .pipe(filter(event => event instanceof ChildActivationEnd))
            .subscribe(event => {
                let snapshot = (event as ChildActivationEnd).snapshot;
                while (snapshot.firstChild !== null) {
                    snapshot = snapshot.firstChild;
                }
                this.titleService.setTitle(snapshot.data.title || 'data-trader-web');
            });
    }

    ngOnInit() {
        this.userService.autoLogin();
        this.autoShare(60 * 1000);
    }

    private autoShare(time: number) {
        this.userService.user.subscribe(usr => {
            if(!!usr && usr.isSharing) {
                this.marketService.getDeviceDataForIntervalPerUser(time);
            } else {
                this.marketService.stopGetDeviceDataForIntervalPerUser();
            }
        });

        this.userService.shareStateSubject.subscribe(state => {
            if(state) {
                this.marketService.getDeviceDataForIntervalPerUser(time);
            } else {
                this.marketService.stopGetDeviceDataForIntervalPerUser();
            }
        });
    }
}
