import {Recipe} from './recipe.model';
import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService {

    recipesChanged = new Subject<Recipe[]>();

    private recipes : Recipe[] = [
        new Recipe('A test recipe', 
        'This is simply a test', 
        'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_1280.jpg',
        [
            new Ingredient('Meat', 1),
            new Ingredient("french fried", 20)
        ]),
        new Recipe('Big fat burger', 
        'Burger king',  
        'http://pluspng.com/img-png/burger-hd-png-burger-png-picture-png-image-2008.png',
        [
            new Ingredient("Buns", 2),
            new Ingredient('Meat', 1)
        ])
      ];

      constructor(private slService : ShoppingListService){}
    
      getRecipes(){
          //return this.recipes; //this will be a direct reference !! 
          return this.recipes.slice(); //this will return the copy of the array !
      }

      getRecipeByID(id : number) : Recipe {
          return this.recipes[id]; //this will return the reference to the object 
      } 

      addIngredientsToShoppingList(ingredients : Ingredient[]){
        this.slService.onIngredientsAdded(ingredients);
      }

      addReicpe(recipe : Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice())
      }

      updateRecipe(index : number, recipe : Recipe){
        this.recipes[index] = recipe;
        this.recipesChanged.next(this.recipes.slice())
      }

      deleteRecipe(index :number){
        this.recipes.splice(index, 1); //SPLICE IS NOT THE SAME AS SLICE 
        this.recipesChanged.next(this.recipes.slice());
      }

}