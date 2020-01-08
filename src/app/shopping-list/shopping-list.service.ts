import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

export class ShoppingListService {
    
    ingredientsChanged = new Subject<Ingredient[]>();
    startedEditinig = new Subject<number>();  //send the number in the array 

    private ingredients : Ingredient[] = [
        new Ingredient('Apples', 10),
        new Ingredient("Tomatos", 4)
      ];

    getIngredients() {
        return this.ingredients.slice(); //we could return the original array 
    }

    getIngredient(index : number) {
        return this.ingredients[index];
    }

    onIngredientAdded(ingredient : Ingredient){
        this.ingredients.push(ingredient);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    onIngredientsAdded(ingredients : Ingredient[]){
        // for (let ingredient of ingredients){
        //     this.onIngredientAdded(ingredient); //this will emit a lot of events emissions 
        // }
        this.ingredients.push(...ingredients); //spread the ingredients into the list of single ingredients 
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    updateIngredient(index : number, newIngredient : Ingredient){
        this.ingredients[index] = newIngredient;
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    deleteIngredients(ingredientNumber : number){ 
        this.ingredients.splice(ingredientNumber, 1);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

}