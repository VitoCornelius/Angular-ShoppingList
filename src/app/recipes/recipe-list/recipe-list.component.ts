import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from './../recipe.model';
import { RecipeService } from '../recipe.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipes : Recipe[];

  constructor(private recipeService : RecipeService, private router : Router, private route : ActivatedRoute) { }

  ngOnInit() {
    this.recipeService.recipesChanged.subscribe((recipes : Recipe[]) => {
      this.recipes = recipes;
    })
    this.recipes = this.recipeService.getRecipes(); //this is a copy of the array 
  }

  goToEdit() {
    this.router.navigate(['new'], {relativeTo : this.route });
  }

}
