import { EventEmitter, Injectable } from "@angular/core"
import { Subject } from "rxjs";
import { Ingredient } from "./ingredient.model"

@Injectable()
export class ShoppingListService {

    ingredientsListChanged = new Subject<Ingredient[]>();
    editing = new Subject<number>()

    ingredients: Ingredient[] = [
        new Ingredient('patate', 2),
        new Ingredient('farina', 4)
    ];

    // returns a copy of the array
    getIngredients() {
        return this.ingredients.slice();
    }

    getIngredientbyId(idx: number) {
        return this.ingredients[idx]
    }
    
    addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.ingredientsListChanged.next(this.ingredients.slice())
    }

    //Mainly used to add ingredients from recipe to shopping list
    // 3 dot to spread an array into multiple objects
    addIngredients(ingredients: Ingredient[]) {
        this.ingredients.push(...ingredients)
        this.ingredientsListChanged.next(this.ingredients.slice())
    }

    updateIngredient(idx: number, newingredient: Ingredient) {
        this.ingredients[idx] = newingredient
        this.ingredientsListChanged.next(this.ingredients.slice())
    }

    deleteIngredient(idx: number) {
        this.ingredients.splice(idx, 1)
        this.ingredientsListChanged.next(this.ingredients.slice())
    }
}