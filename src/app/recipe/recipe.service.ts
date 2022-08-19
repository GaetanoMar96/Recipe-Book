import { Injectable, EventEmitter } from "@angular/core"
import { FormGroup } from "@angular/forms";
import { Subject } from "rxjs";
import { Ingredient } from "../shopping-list/ingredient.model";
import { Recipe } from "./recipe.model"

@Injectable()
export class RecipeService {

    recipesChanged= new Subject<Recipe[]>();
    recipeSelected = new EventEmitter<Recipe>();

    private recipes: Recipe[] = [
        new Recipe(
            'patate al forno', 
            'patate croccanti cotte in forno', 
            'https://deliziosetentazionidivale.it/wp-content/uploads/2021/12/Patate-al-Forno-croccanti.jpg',
            [
                new Ingredient('patate', 10),
                new Ingredient('olio', 1)
            ]),

        new Recipe(
            'polpette al sugo', 
            'palline di carne condite con sugo', 
            'https://www.ricetteslowcooker.it/wp-content/uploads/2020/10/polpettine-al-sugo-2.jpg',
            [
                new Ingredient('carne', 1),
                new Ingredient('pomodorni', 5)
            ]),
    ];

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes
        this.recipesChanged.next(this.recipes.slice())
    }

    getRecipes() {
        return this.recipes.slice();
    }

    getRecipe(idx: number) {
        return this.recipes.slice()[idx];
    }

    updateRecipe(idx: number, recipeInfo: Recipe) {
        this.recipes[idx] = recipeInfo;
        this.recipesChanged.next(this.recipes.slice())
    }

    addRecipe(recipeInfo: Recipe) {
        this.recipes.push(recipeInfo)
        this.recipesChanged.next(this.recipes.slice())
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
      }


}