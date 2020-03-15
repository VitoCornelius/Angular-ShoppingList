import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

const applicationRoutes : Routes = [
    {path : '', redirectTo : '/recipes', pathMatch : 'full'},
    {path : 'recipes', loadChildren : './recipes/recipes.module#RecipesModule'} //the code is split here, the declaration here is put into 
    //a separate code bundle 
];

@NgModule({
    imports: [
        RouterModule.forRoot(applicationRoutes)
    ],
    exports : [RouterModule]
})
export class RoutingComponent {}
