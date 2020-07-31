import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from '@app/auth/services/user.service';
import { exhaustMap, take } from 'rxjs/operators';
import { environment } from 'environments/environment';

@Injectable()
export class SettingsService {

    constructor(
        private httpClient: HttpClient,
        private userService: UserService
    ) {}

    changePassword(password: string) {
        return this.userService.user.pipe(take(1), exhaustMap(user => {
            return this.httpClient.patch(environment.API_URL + '/api/settings/change-password', {
                email: user.email, 
                password: password
            });
        }));
    }

    checkPasswordValidity(password: string) {
        return this.userService.user.pipe(take(1), exhaustMap(user => {
            return this.httpClient.post(environment.API_URL + '/api/settings/check-password', {
                email: user.email,
                password: password
            });
        }));
    }
    
}