import { Ingredient } from '../shared/ingredient.model';
import { EventEmitter } from '@angular/core';

export class ShoppingListService {
    
    ingredientsChanged = new EventEmitter<Ingredient[]>();

    private ingredients : Ingredient[] = [
        new Ingredient('Apples', 10),
        new Ingredient("Tomatos", 4)
      ];

    getIngredients() {
        return this.ingredients.slice(); //we could return the original array 
    }

    onIngredientAdded(ingredient : Ingredient){
        this.ingredients.push(ingredient);
        this.ingredientsChanged.emit(this.ingredients.slice());
    }

}