import { Component, OnInit, ViewChild, Output, EventEmitter, ElementRef } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  //@ViewChild('nameInput') nameInputRef : ElementRef;
  //@ViewChild('amountInput') amountInputRef : ElementRef; //always add the element ref 

  @ViewChild('f') signupForm : NgForm; 

  constructor(private shoppingListService : ShoppingListService) { }

  ngOnInit() {
  }

  addIngredient(){
    // this.shoppingListService.onIngredientAdded(new Ingredient(
    //   this.nameInputRef.nativeElement.value, this.amountInputRef.nativeElement.value
    //   ));
    this.shoppingListService.onIngredientAdded(new Ingredient(this.signupForm.value.name, this.signupForm.value.amount)
    );
  }

  deleteIngredients(){
    this.shoppingListService.deleteIngredients(new Ingredient(this.signupForm.value.name, this.signupForm.value.amount))
  }

  clearIngredients(){
    this.shoppingListService.clearAllIngredients();
  }

}
