import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { GetService } from 'src/app/services/get.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.scss'],
})
export class RecipeDetailsComponent implements OnInit {
  recipeId: any;
  recipeDetails: any;
  ingredients: any[] = [];
  recipeData = new Subscription();
  constructor(private route: ActivatedRoute, private getService: GetService) {
    this.recipeId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.getSelectedRecipe();
  }

  getSelectedRecipe() {
    this.recipeData = this.getService
      .get(
        `recipes/${this.recipeId}/information?apiKey=a7061f9e958943f7b9a13912b67a2880`
      )
      .subscribe((res) => {
        this.recipeDetails = res;
        this.ingredients = this.recipeDetails.extendedIngredients;
      });
  }

}
