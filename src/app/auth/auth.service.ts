import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

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
        );
    }
}