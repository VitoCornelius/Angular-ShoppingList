import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
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

  constructor(private route : ActivatedRoute, private recipeService : RecipeService, private router : Router) { }

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
                'name' : new FormControl(ingredient.name, Validators.required),
                'amount' : new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
              }
            )
          )
        }
      }
    }

    this.recipeForm = new FormGroup({
      'name' : new FormControl(recipeName, Validators.required), //set the default value
      'imagePath' : new FormControl(recipeImagePath, Validators.required),
      'description' : new FormControl(recipeDescription, Validators.required),
      'ingredients' : recipeIngredients
    })
  }

  onSubmit() {
    // const recipe = new Recipe(
    //   this.recipeForm.value['name'],
    //   this.recipeForm.value['description'],
    //   this.recipeForm.value['imagePath'],
    //   this.recipeForm.value['ingredients']
    // );

    //no need to create an object, the form object should have all the values

    if (this.editMode){
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    } else {
      this.recipeService.addReicpe(this.recipeForm.value);
    }
    this.onCancel();
  }

  onAddIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name' : new FormControl(null, Validators.required),
        'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    )
  }

  getControls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onCancel(){
    this.router.navigate(['../'], {relativeTo : this.route}); //navigate UP , need a router and activated route 
  }

}
