import { HttpClient } from "@angular/common/http";
import { Recipe } from "../recipe/recipe.model";
import { map } from "rxjs-compat/operator/map";
import { Injectable } from "@angular/core";
import { RecipeService } from "../recipe/recipe.service";

@Injectable({providedIn: 'root'})
export class DataStorageService {
    
    constructor(private http: HttpClient,
        private recipeService: RecipeService) {}

    storeRecipes() {
        
        const recipes = this.recipeService.getRecipes()

        this.http
            .put<{recipes: Recipe[]}>(
                'https://recipe-book-1bf75-default-rtdb.europe-west1.firebasedatabase.app/recipes.json',
                recipes
            ).subscribe(
                responseData => {
                    console.log(responseData)
                }
            )
    }

    fetchRecipes() {
        this.http
            .get<Recipe[]>(
                'https://recipe-book-1bf75-default-rtdb.europe-west1.firebasedatabase.app/recipes.json'
            ).subscribe(
                recipes => this.recipeService.setRecipes(recipes)
            )
    }    
}