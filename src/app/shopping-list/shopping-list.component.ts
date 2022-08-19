import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { Ingredient } from "./ingredient.model";
import { ShoppingListService } from "./shopping-list.service";

@Component({
    selector: 'app-shopping-list',
    templateUrl: './shopping-list.component.html',
})
export class ShoppingListComponent implements OnInit, OnDestroy {
    
    ingredients: Ingredient[]
    subscription: Subscription

    constructor(private shoppingListService: ShoppingListService) {}

    // subscribe method listens to an event to catch the changes
    ngOnInit(): void {
        this.ingredients = this.shoppingListService.getIngredients();    
        this.subscription = this.shoppingListService.ingredientsListChanged.
        subscribe(
            (ingredients: Ingredient[]) => {this.ingredients = ingredients}
        );
    }

    onEditItem(idx: number) {
        this.shoppingListService.editing.next(idx)
    }
    
    ngOnDestroy(): void {
        this.subscription.unsubscribe()
    }
}