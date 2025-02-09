import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../models/auth.model';
import { UserModel } from '../models/user.model';
import { environment } from 'environments/environment';

@Injectable({ providedIn: 'root' })
export class UserService {
    user = new BehaviorSubject<UserModel>(null!);
    shareStateSubject = new Subject<boolean>();
    
    constructor(private httpClient: HttpClient) {}

    private authenticate(email: string, token: string, isSharing: boolean) {
        const user = new UserModel(email, token, isSharing);
        this.user.next(user);
        localStorage.setItem('userData', JSON.stringify(user))
    }

    autoLogin() {
        const userData = JSON.parse(localStorage.getItem('userData')!);
        if(!userData) {
            return;
        }
        
        const user = new UserModel(userData._email, userData._token, userData._isSharing);
        if(user.token) {
            this.user.next(user);
        }
    }

    registerUser(user: User): Observable<User> {
        return this.httpClient.post<User>(environment.API_URL + '/api/auth/register', user)
        .pipe(tap(res => {
            this.authenticate(res.email!, res.token!, false);
        }));
    }
    
    loginUser(user: User) {
        return this.httpClient.post<User>(environment.API_URL + '/api/auth/login', user)
        .pipe(tap(res => {
            this.authenticate(res.email!, res.token!, res.isSharing!);
        }));
    }

    storeIsSharing(isSharing: boolean) {
        const userData = JSON.parse(localStorage.getItem('userData')!);
        userData._isSharing = isSharing;
        localStorage.setItem('userData', JSON.stringify(userData));
    }

    logoutUser() {
        this.user.next(null!);
        localStorage.removeItem('userData');
    }
    
    setUserSharing(isSharing: boolean) {
        this.shareStateSubject.next(isSharing);
        this.storeIsSharing(isSharing);
    }

}
