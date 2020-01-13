import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-added',
  templateUrl: './recipe-added.component.html',
  styleUrls: ['./recipe-added.component.css']
})
export class RecipeAddedComponent implements OnInit {

  id : number;
  editMode = false; //initialy creainng new recipe
  recipeForm : FormGroup;

  constructor(private route : ActivatedRoute, private recipeService : RecipeService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params : Params) => {
        this.id  = +params['id'];
        this.editMode = params['id'] != null ; //if the params have the ID ! 
        console.log(this.editMode);
        this.initForm();
      }
    )
  }

  private initForm = () =>  {

    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]); //default value of an empry array


    if (this.editMode) {
      let recipe : Recipe = this.recipeService.getRecipeByID(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;

      if (recipe['ingredients']) {  //if it has the ingredients 
        for (let ingredient of recipe.ingredients){
          recipeIngredients.push(
            new FormGroup(
              {
                'name' : new FormControl(ingredient.name),
                'amount' : new FormControl(ingredient.amount)
              }
            )
          )
        }
      }
    }

    this.recipeForm = new FormGroup({
      'name' : new FormControl(recipeName), //set the default value
      'imagePath' : new FormControl(recipeImagePath),
      'description' : new FormControl(recipeDescription),
      'ingredients' : recipeIngredients
    })
  }

  onSubmit() {
    console.log(this.recipeForm);
  }

  onAddIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name' : new FormControl(),
        'amount': new FormControl()
      })
    )
  }

  getControls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

}
