import { HttpHandler, HttpInterceptor, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { UserService } from './services/user.service';
import { take, exhaustMap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
    constructor(private userService: UserService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        return this.userService.user.pipe(
            take(1), 
            exhaustMap(user => {
                if(!user) {
                    return next.handle(req);
                }

                const authReq = req.clone({
                    headers: new HttpHeaders({'x-auth':  user.token!})
                });
                return next.handle(authReq);
            })
        );
    }
}