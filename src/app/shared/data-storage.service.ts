import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";
import { map, tap, take, exhaustMap } from 'rxjs/operators';
import { Observable } from "rxjs";
import { AuthService } from "../auth/auth.service";

@Injectable({ providedIn: 'root' })
export class DataStorageService {

    constructor(private http: HttpClient, private recipeService: RecipeService, private authService : AuthService) { }

    storeRecipes() {
        const recipes: Recipe[] = this.recipeService.getRecipes();
        this.http.put('https://recipes-cf161.firebaseio.com/recipes.json', recipes)
        .subscribe(response => {
            console.log(response);
        });
    }

    fetchRecipes(){
        return this.authService.user.pipe(
            take(1), 
            exhaustMap(user => { //replace the observable with the new one with this function
                return this.http.get<Recipe[]>(
                    'https://recipes-cf161.firebaseio.com/recipes.json', {params : new HttpParams().set('auth', user.token)}
                )
            }) , 
            map(recipes => {
                return recipes.map(recipe => {
                    return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] }
                });
            }), 
            tap(resipes => {
                this.recipeService.setRecipes(resipes);
            })
            ) //I only want to take one value and the unsubscribe immediately  
    }
}