import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterState } from "@angular/router";
import { Recipe } from "./recipe.model";
import { DataStorageService } from "../shared/data-storage.service";

// @Injectable({providedIn : 'root'})
export class RecipesResolverService /*implements Resolve<Recipe[]>*/ {
    //constructor(private dataStorageService : DataStorageService){}

    // resolve(route : ActivatedRouteSnapshot, routingState : RouterState){
    //     this.dataStorageService.fetchRecipes();
    // }


}

