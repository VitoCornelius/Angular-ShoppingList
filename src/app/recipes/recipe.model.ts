import { Ingredient } from "../shared/ingredient.model";

export class Recipe {
    //how a recipe should look like
    public name : string;
    public description : string;
    public imagePath : string; //this will hold the url 
    public ingredients : Ingredient[];

    constructor(name : string, desc : string , imagePath : string, ingredients : Ingredient[]) {
        this.name = name;
        this.description = desc;
        this.imagePath = imagePath;
        this.ingredients = ingredients;
    }
}