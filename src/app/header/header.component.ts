import { Component, EventEmitter, Output, OnInit, OnDestroy } from "@angular/core";
import { DataStorageService } from "../shared/data-storage.service";
import { AuthService } from "../auth/auth.service";
import { Subscription } from "rxjs";

@Component({
    selector : 'app-header',
    templateUrl : './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
    isAuthenticated = false;
    collapsed = true;
    userSub : Subscription;

    constructor(private datasStorage : DataStorageService, private authService : AuthService){}

    onStoreData() {
        this.datasStorage.storeRecipes();
    }

    onFetchData(){
        this.datasStorage.fetchRecipes().subscribe();
    }

    ngOnInit() {
        this.userSub = this.authService.user.subscribe(user => {
            console.log(user);
            this.isAuthenticated = !!user;
        });
    }

    ngOnDestroy(){
        this.userSub.unsubscribe();
    }

    onLogout(){
        this.authService.logout();
    }
} 