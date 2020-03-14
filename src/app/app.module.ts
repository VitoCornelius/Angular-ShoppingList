import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ShoppingListService } from './shopping-list/shopping-list.service';
import { RoutingComponent } from './routing.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecipeService } from './recipes/recipe.service';
import { AuthComponent } from './auth/auth.component';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { AlertComponent } from './shared/alert/alert.component';
import { RecipesModule } from './recipes/recipes.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    RoutingComponent, //this should be named module 
    HttpClientModule , //we need to add the http client 
    RecipesModule, //this will also contain the recipes routes 
    ShoppingListModule,
    SharedModule,
    AuthModule
  ],
  providers: [ShoppingListService, RecipeService, {provide : HTTP_INTERCEPTORS, useClass : AuthInterceptorService, multi : true}],
    //we can place this in a separate module -> but it is generally better to keep the annotation providedin instead of placing it here 
  bootstrap: [AppComponent],
  entryComponents : [ //the components that will be eventually created programatically 
    AlertComponent
  ]
})
export class AppModule { }
