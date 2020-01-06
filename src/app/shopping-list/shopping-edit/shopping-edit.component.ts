import { Component, OnInit, ViewChild, Output, EventEmitter, ElementRef, OnDestroy } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  //@ViewChild('nameInput') nameInputRef : ElementRef;
  //@ViewChild('amountInput') amountInputRef : ElementRef; //always add the element ref 

  @ViewChild('f') signupForm : NgForm; 
  subscriptionItemSelected : Subscription;
  editMode = false;
  editedItemIndex : number;
  editedItem : Ingredient;

  constructor(private shoppingListService : ShoppingListService) { }

  ngOnInit() {
    this.subscriptionItemSelected = this.shoppingListService.startedEditinig.subscribe((index : number)=>{
      this.editMode = true;
      this.editedItemIndex = index;
      this.editedItem = this.shoppingListService.getIngredient(index);
      this.signupForm.setValue({
        name : this.editedItem.name,
        amount : this.editedItem.amount
      })
    })
  }

  ngOnDestroy() {
    this.subscriptionItemSelected.unsubscribe();
  }

  addIngredient(){
    // this.shoppingListService.onIngredientAdded(new Ingredient(
    //   this.nameInputRef.nativeElement.value, this.amountInputRef.nativeElement.value
    //   ));
    this.shoppingListService.onIngredientAdded(new Ingredient(this.signupForm.value.name, this.signupForm.value.amount)
    );
  }

  // deleteIngredients(){
  //   this.shoppingListService.deleteIngredients(new Ingredient(this.signupForm.value.name, this.signupForm.value.amount))
  // }

  // clearIngredients(){
  //   this.shoppingListService.clearAllIngredients();
  // }

}
