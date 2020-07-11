import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../models/auth.model';
import { UserModel } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
    user = new BehaviorSubject<UserModel>(null!);
    shareStateSubject = new Subject<boolean>();
    
    constructor(private httpClient: HttpClient) {}

    private authenticate(email: string, token: string) {
        const user = new UserModel(email, token);
        this.user.next(user);
        localStorage.setItem('userData', JSON.stringify(user))
    }

    autoLogin() {
        const userData = JSON.parse(localStorage.getItem('userData')!);
        if(!userData) {
            return;
        }
        
        const user = new UserModel(userData._email, userData._token)
        if(user.token) {
            this.user.next(user);
        }
    }

    registerUser(user: User): Observable<User> {
        return this.httpClient.post<User>('http://localhost:3000/api/auth/register', user)
        .pipe(tap(res => {
            this.authenticate(res.email!, res.token!);
        }));
    }
    
    loginUser(user: User) {
        return this.httpClient.post<User>('http://localhost:3000/api/auth/login', user)
        .pipe(tap(res => {
            this.authenticate(res.email!, res.token!);
        }));
    }

    logoutUser() {
        this.user.next(null!);
        localStorage.removeItem('userData');
    }
    
    setUserSharing(isSharing: boolean) {
        this.shareStateSubject.next(isSharing);
        localStorage.setItem('share-permission', JSON.stringify(isSharing))
    }

    getUserSharing() {
        return JSON.parse(localStorage.getItem('share-permission')!);
    }

}
