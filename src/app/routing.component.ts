import {Routes, RouterModule} from '@angular/router';
import { NgModule } from '@angular/core';

import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipeAddedComponent } from './recipes/recipe-added/recipe-added.component';
import { RecipesResolverService } from './recipes/recipes-resolver.service';
import { AuthComponent } from './auth/auth.component';
 
const applicationRoutes : Routes = [
    {path : '', redirectTo : '/recipes', pathMatch : 'full'},
    {path : 'recipes', component : RecipesComponent, 
    children : [
        {path : '', component : RecipeStartComponent}, //the initial 
        {path : 'new', component : RecipeAddedComponent}, //creating the new component
        {path : ':id', component : RecipeDetailComponent, resolve : [RecipesResolverService]}, //dynamic parameters shall be loaded last 
        {path : ':id/edit', component : RecipeAddedComponent, resolve : [RecipesResolverService]}  //edit mode for the existing recipe
    ]},
    {path : 'shopping-list', component : ShoppingListComponent},
    {path : 'auth', component : AuthComponent}
];

@NgModule({
    imports: [
        RouterModule.forRoot(applicationRoutes)
    ],
    exports : [RouterModule]
})
export class RoutingComponent {}
