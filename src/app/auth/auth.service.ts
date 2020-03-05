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

    logout() {
        this.user.next(null); //set the user to null 
        this.router.navigate(['/auth']);
    }

    private handleAuthentication(email : string, id : string, token : string, expiredIn : number){
        const expirationTime = new Date(new Date().getTime() + expiredIn + 1000);
        const user = new User(email, id, token, expirationTime);
        this.user.next(user); //emit as the now logged user 
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