import { NgModule } from "@angular/core";

import { RecipesComponent } from './recipes.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeAddedComponent } from './recipe-added/recipe-added.component';
import { RouterModule } from "@angular/router";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

@NgModule({
    declarations : [
        RecipesComponent,
        RecipeListComponent,
        RecipeDetailComponent,
        RecipeItemComponent,
        RecipeStartComponent,
        RecipeAddedComponent
    ] , 
    exports : [ //export all so that they are used in the next module
        RecipesComponent,
        RecipeListComponent,
        RecipeDetailComponent,
        RecipeItemComponent,
        RecipeStartComponent,
        RecipeAddedComponent
    ], imports : [
        RouterModule, 
        CommonModule, //use the common module instead of BrowerModule 
        ReactiveFormsModule
    ]
})
export class RecipesModule {}