import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, filter, Observable, switchMap, take, throwError } from "rxjs";
import { AuthenticationService } from "./authentication.service";
import { LoginResponse } from "./login/login-response";

@Injectable({
    providedIn:'root'
})

export class TokenInterceptor implements HttpInterceptor{

    isTokenRefreshing=false;
    refreshTokenSubject:BehaviorSubject<any>=new BehaviorSubject(null);
    //why dd he put public instead of private here
    constructor(private authService:AuthenticationService){

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.url.indexOf('refresh') !== -1 || req.url.indexOf('login') !== -1) {
            return next.handle(req);
        }
        const jwtToken = this.authService.getJwtToken();
console.log("cmon bro....");
console.log(jwtToken);
        if (jwtToken) {
            console.log("make it in here? matching jwttokens");
            return next.handle(this.addToken(req,jwtToken)).pipe(catchError(error=> {
                if( error instanceof HttpErrorResponse && (error.status === 401 || error.status == 500) ) {   //changing error from 403 to 401, adding in error 500 results in refreshtoken not getting a new value (invalid refresh token)
                    console.log("make it in here? this is intercept");
                    return this.handleAuthErrors(req,next);
                } else {
                    return throwError(()=>error);
                }
            }));
        }
        return next.handle(req);

    }

    private handleAuthErrors(req: HttpRequest<any>, next: HttpHandler)
    : Observable<HttpEvent<any>> {
        if (!this.isTokenRefreshing) {
            this.isTokenRefreshing = true;
            this.refreshTokenSubject.next(null);

            return this.authService.refreshToken().pipe(
                switchMap((refreshTokenResponse: LoginResponse) => {
                    this.isTokenRefreshing = false;
                    this.refreshTokenSubject
                        .next(refreshTokenResponse.authenticationToken);
                    return next.handle(this.addToken(req,
                        refreshTokenResponse.authenticationToken));
                })
            )
        } else {
            return this.refreshTokenSubject.pipe(
                filter(result => result !== null),
                take(1),
                switchMap((res) => {
                    return next.handle(this.addToken(req,
                        this.authService.getJwtToken()))
                })
            );
        }
    //     console.log("make it in here? this is handleautherrors");
    //     console.log(this.isTokenRefreshing);    //this value is currently true so it will never get into the if statement?
    // if (!this.isTokenRefreshing) {
    //     console.log("make it in here?1");
    //     this.isTokenRefreshing = true;
    //     this.refreshTokenSubject.next(null);
    //     console.log("make it in here?2");
    //     return this.authService.refreshToken().pipe(
    //         switchMap((refreshTokenResponse: LoginResponse) => {
    //             this.isTokenRefreshing = false;
    //             this.refreshTokenSubject
    //                 .next(refreshTokenResponse.authenticationToken);
    //             return next.handle(this.addToken(req,
    //                 refreshTokenResponse.authenticationToken));
    //         })
    //     )
    // } else {
    //     return this.refreshTokenSubject.pipe(
    //         filter(result => result !== null),
    //         take(1),
    //         switchMap((res) => {
    //             return next.handle(this.addToken(req,
    //                 this.authService.getJwtToken()))
    //         })
    //     );
    // }
    }

    addToken(req: HttpRequest<any>, jwtToken: any) {
        return req.clone({
            headers: req.headers.set('Authorization',
                'Bearer ' + jwtToken)
        });
    }
}
