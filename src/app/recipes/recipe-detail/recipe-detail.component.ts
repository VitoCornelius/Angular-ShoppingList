import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  @Input() selectedRecipe : Recipe;
  id : number;
  constructor(private recipeService : RecipeService, private route : ActivatedRoute, private router : Router) { }

  ngOnInit() {
    //const id = this.route.snapshot.params['id']; //this will only load for the first time 
    this.route.params.subscribe(
      (params : Params) => {
        this.id = +params['id'];
        console.log(this.id);
        this.selectedRecipe = this.recipeService.getRecipeByID(this.id);
      }
    )
  }

  addRecipesToTheShoppingList(){  
    this.recipeService.addIngredientsToShoppingList(this.selectedRecipe.ingredients);
  }

  editRecipe(){
    this.router.navigate(['edit'], {relativeTo : this.route});
  }

}
