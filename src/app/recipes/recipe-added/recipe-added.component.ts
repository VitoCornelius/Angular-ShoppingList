import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-recipe-added',
  templateUrl: './recipe-added.component.html',
  styleUrls: ['./recipe-added.component.css']
})
export class RecipeAddedComponent implements OnInit {

  id : number;
  editMode = false; //initialy creainng new recipe

  constructor(private route : ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params : Params) => {
        this.id  = +params['id'];
        this.editMode = params['id'] != null ; //if the params have the ID ! 
        console.log(this.editMode);
      }
    )
  }

}
