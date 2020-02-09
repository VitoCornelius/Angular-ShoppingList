import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";


interface AuthResponseData {
    kind : string;
    idToken : string;
    email : string;
    refreshToken : string;
    expiresIn : string;
    localId : string;
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
        ).pipe(catchError(errorRes => { 
            console.log(errorRes);
            let errorMessage = 'An unknown error occured';
            if (!errorRes.error  || !errorRes.error.error){
                return throwError(errorMessage);
            }
            switch (errorRes.error.error.message){
                case "EMAIL_EXISTS" :
                    errorMessage = 'This email already exists';
            }
            return throwError(errorMessage);
        } ));
    }
}