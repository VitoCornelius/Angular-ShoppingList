import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { NgModule } from '@angular/core';

const applicationRoutes : Routes = [
    {path : '', redirectTo : '/recipes', pathMatch : 'full'},
    {path : 'recipes', loadChildren : './recipes/recipes.module#RecipesModule'} //the code is split here, the declaration here is put into 
    //a separate code bundle 
];

@NgModule({
    imports: [
        RouterModule.forRoot(applicationRoutes, {preloadingStrategy : PreloadAllModules}) //this will preload the bundles as soon as possible.
        //The initial bundle is still kept small. Fast initial load and fast subsequent load 
    ],
    exports : [RouterModule]
})
export class RoutingComponent {}
