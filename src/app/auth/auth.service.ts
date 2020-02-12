import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";

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
    constructor(private httpClient : HttpClient){}

    signUp(email : String, password : String){
        return this.httpClient.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCiwvnnA6qER1xAoNooL8k1Ttze88BVMSA',
            {
                email : email, 
                password : password,
                returnSecureToken : true
            }
        ).pipe(catchError(this.handleError));
    }

    login(email : string, password : string) {
        return this.httpClient.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCiwvnnA6qER1xAoNooL8k1Ttze88BVMSA', 
        {
            email : email, 
            password : password,
            returnSecureToken : true 
        }).pipe(catchError(this.handleError));
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