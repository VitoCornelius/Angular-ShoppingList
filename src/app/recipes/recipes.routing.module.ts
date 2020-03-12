import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { RecipesComponent } from "./recipes.component";
import { AuthGuard } from "../auth/auth.guard";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipeAddedComponent } from "./recipe-added/recipe-added.component";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipesResolverService } from "./recipes-resolver.service";

const routes : Routes = [    {path : 'recipes', component : RecipesComponent, canActivate : [AuthGuard],
    children : [
        {path : '', component : RecipeStartComponent}, //the initial 
        {path : 'new', component : RecipeAddedComponent}, //creating the new component
        {path : ':id', component : RecipeDetailComponent, resolve : [RecipesResolverService]}, //dynamic parameters shall be loaded last 
        {path : ':id/edit', component : RecipeAddedComponent, resolve : [RecipesResolverService]}  //edit mode for the existing recipe
    ]}
];

@NgModule({
    imports : [RouterModule.forChild(routes)],
    exports : [RouterModule]
})
export class RecipesRoutingModule {} 