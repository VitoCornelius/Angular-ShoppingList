import { Ingredient } from '../shared/ingredient.model';

export class ShoppingListService {
    
    private ingredients : Ingredient[] = [
        new Ingredient('Apples', 10),
        new Ingredient("Tomatos", 4)
      ];

    getIngredients() {
        return this.ingredients.slice();
    }

    onIngredientAdded(ingredient : Ingredient){
        this.ingredients.push(ingredient);
    }
    

}