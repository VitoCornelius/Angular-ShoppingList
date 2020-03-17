import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';
import { LoggingService } from '../logging.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
 
  
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients : Ingredient[];
  idChangeSub : Subscription;

  constructor(private shoppingListService : ShoppingListService, private loggingService : LoggingService) { }

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();
    this.idChangeSub = this.shoppingListService.ingredientsChanged.subscribe(
      (ingredients : Ingredient[]) => {
        this.ingredients = ingredients;
      }
    )
    this.loggingService.printlog('Hello from the shopping list component');
  }

  ngOnDestroy() {
    this.idChangeSub.unsubscribe();
  }

  onEditItem(id : number) {
    this.shoppingListService.startedEditinig.next(id);
  }

}
