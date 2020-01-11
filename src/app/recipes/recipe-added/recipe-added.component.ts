import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
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


    if (this.editMode) {
      let recipe : Recipe = this.recipeService.getRecipeByID(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
    }

    this.recipeForm = new FormGroup({
      'name' : new FormControl(recipeName), //set the default value
      'imagePath' : new FormControl(recipeImagePath),
      'description' : new FormControl(recipeDescription)
    })
  }

  onSubmit() {
    console.log(this.recipeForm);
  }

}
