import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from '@app/auth/services/user.service';
import { exhaustMap, take } from 'rxjs/operators';

@Injectable()
export class SettingsService {

    constructor(
        private httpClient: HttpClient,
        private userService: UserService
    ) {}

    changePassword(password: string) {
        return this.userService.user.pipe(take(1), exhaustMap(user => {
            return this.httpClient.patch('http://localhost:3000/api/settings/change-password', {
                email: user.email, 
                password: password
            });
        }));
    }

    checkPasswordValidity(password: string) {
        return this.userService.user.pipe(take(1), exhaustMap(user => {
            return this.httpClient.post('http://localhost:3000/api/settings/check-password', {
                email: user.email,
                password: password
            });
        }));
    }
    
}