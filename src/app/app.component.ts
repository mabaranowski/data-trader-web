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
        
        console.log('HELLO');
        console.log(this.userService.getUserSharing());
        this.userService.shareStateSubject.subscribe(state => {
            console.log(state);
            if(state) {
                this.marketService.getDeviceDataForIntervalPerUser(5 * 1000);
            } else {
                this.marketService.stopGetDeviceDataForIntervalPerUser();
            }
        })
    }
}
