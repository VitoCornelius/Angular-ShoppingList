import {Routes, RouterModule} from '@angular/router';
import { NgModule } from '@angular/core';

import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipeAddedComponent } from './recipes/recipe-added/recipe-added.component';
import { RecipesResolverService } from './recipes/recipes-resolver.service';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';
 
const applicationRoutes : Routes = [
    {path : '', redirectTo : '/recipes', pathMatch : 'full'},
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
