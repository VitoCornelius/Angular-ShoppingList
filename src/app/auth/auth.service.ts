import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, tap} from "rxjs/operators";
import { throwError, Subject, BehaviorSubject} from "rxjs";
import { User } from "./user.model";
import { Router } from "@angular/router";

export interface AuthResponseData {
    kind : string;
    idToken : string;
    email : string;
    refreshToken : string;
    expiresIn : string;
    localId : string;
    registered? : boolean;
}

@Injectable({providedIn : 'root'})
export class AuthService {

    user = new BehaviorSubject<User>(null); //Events when the new user is logged in 
    private tokenExpirationTimer : any = null;//save the timer in the variable 

    constructor(private httpClient : HttpClient, private router : Router){}

    signUp(email : String, password : String){
        return this.httpClient.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCiwvnnA6qER1xAoNooL8k1Ttze88BVMSA',
            {
                email : email, 
                password : password,
                returnSecureToken : true
            }
        ).pipe(catchError(this.handleError), tap(resData => {
            this.handleAuthentication(resData.email, resData.localId, resData.idToken,  +resData.expiresIn);
        }));
    }

    login(email : string, password : string) {
        return this.httpClient.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCiwvnnA6qER1xAoNooL8k1Ttze88BVMSA', 
        {
            email : email, 
            password : password,
            returnSecureToken : true 
        }).pipe(catchError(this.handleError), tap(resData => {
            this.handleAuthentication(resData.email, resData.localId, resData.idToken,  +resData.expiresIn);
        }));
    }

    autoLogin() {
        const userData : {
            email : string, 
            id : string,  
            _token : string,
             _tokenExpirationDate : string
            } = JSON.parse(localStorage.getItem('token')); // convert in the simple object 
        if (!userData) {
            return;
        }

        const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));
        if (loadedUser.token) {
            this.user.next(loadedUser);
            const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
            this.autoLogout(expirationDuration);
        }
    }

    autoLogout(expirationDuration : number) {
        this.tokenExpirationTimer = setTimeout(  //get the reference to the timer
            () => { this.logout();
        }, expirationDuration);
    }

    logout() {
        this.user.next(null); //set the user to null 
        this.router.navigate(['/auth']);

        localStorage.removeItem('token');
        if (this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer); //clear the timer 
        }
        this.tokenExpirationTimer = null;
    }

    private handleAuthentication(email : string, id : string, token : string, expiredIn : number){
        const expirationTime = new Date(new Date().getTime() + expiredIn + 1000);
        const user = new User(email, id, token, expirationTime);
        this.user.next(user); //emit as the now logged user 
        this.autoLogout(expiredIn * 1000);

        localStorage.setItem('token', JSON.stringify(user)); //save the token in the local storage -> convert the JS object to the string 
    }

    private handleError(errorResponse : HttpErrorResponse) {
        console.log(errorResponse);
        let errorMessage = 'An unknown error occured';
        if (!errorResponse.error  || !errorResponse.error.error){
            return throwError(errorMessage);
        }
        switch (errorResponse.error.error.message){
            case "EMAIL_EXISTS" :
                errorMessage = 'This email already exists';
                break;
            case "EMAIL_NOT_FOUND" :
                errorMessage = "This email does not exist";
                break;
            case "INVALID_PASSWORD" :
                errorMessage = "The password is invalid";
                break;
        }
        return throwError(errorMessage);
    }
}