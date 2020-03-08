import { Component, ComponentFactoryResolver, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService, AuthResponseData } from "./auth.service";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { AlertComponent } from "../shared/alert/alert.component";
import { PlaceholderDirective } from "../shared/placeholder/placeholder.directive";

@Component({
    selector : 'app-auth',
    templateUrl : './auth.component.html'
})
export class AuthComponent {
    isLoginMode = true;
    isLoading = false;
    error : string = null;

    //this will automaticaly search for the first occurence of the directive in the DOM
    @ViewChild(PlaceholderDirective) alertHost : PlaceholderDirective;

    constructor(
        private authService : AuthService, 
        private router : Router, 
        private componentFactoryResolver : ComponentFactoryResolver
    ) {}

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    onHandleError() {
        this.error = null; //the condition for displaying the error will be removed so the alert will be closed 
    }

    onSubmit(form : NgForm) {
        if (!form.valid){
            return;
        }
        const email = form.value.email;
        const password = form.value.password;

        let authObs : Observable<AuthResponseData>;

        this.isLoading = true;
        if (this.isLoginMode){
            authObs= this.authService.login(email, password);
        } else {
            authObs = this.authService.signUp(email, password);
        }

        authObs.subscribe(responseData => {
            console.log(responseData);
            this.isLoading = false;
            this.error = null;
            this.router.navigate(['/recipes']);
        }, errorMessage => {
            console.log(errorMessage);
            this.isLoading = false;
            this.error = errorMessage;
            this.showErrorAlert(errorMessage);
        }
        );
        console.log(form.value);

        form.reset();
    }

    private showErrorAlert(message : string) {
        //const alertComponent = new AlertComponent(); //this will not work with angular 
        const alertComponentFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
        const hostViewContainerRef = this.alertHost.viewContainerRef;
        hostViewContainerRef.clear(); //clear all the things that have been there
        
        hostViewContainerRef.createComponent(alertComponentFactory);
    }
}