import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from '@app/auth/services/user.service';
import { take, exhaustMap } from 'rxjs/operators';
import { Metrics } from '../models/metrics.model';

@Injectable({ providedIn: 'root' })
export class MarketService {

    constructor(
        private httpClient: HttpClient,
        private userService: UserService
    ) {}

    updateMetrics(form: Metrics) {
        return this.userService.user.pipe(take(1), exhaustMap(user => {
            return this.httpClient.patch('http://localhost:3000/api/metrics', {
                email: user.email,
                form: form
            });
        }));
    }

    getMetrics() {
        return this.userService.user.pipe(take(1), exhaustMap(user => {
            return this.httpClient.post('http://localhost:3000/api/metrics', {
                email: user.email
            });
        }));
    }



    
}