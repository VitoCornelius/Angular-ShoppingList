import {Recipe} from './recipe.model';

export class RecipeService {
    private recipes : Recipe[] = [
        new Recipe('A test recipe', 'This is simply a test', 'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_1280.jpg'),
        new Recipe('Schabowy', 'Zajebisty schabowy',  'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_1280.jpg')
      ];
    
      getRecipes(){
          //return this.recipes; //this will be a direct reference !! 
          return this.recipes.slice(); //this will return the copy of the array !
      }

}