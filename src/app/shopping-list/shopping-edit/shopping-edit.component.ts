import { Component, ViewChild, OnInit, OnDestroy } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";
import { Ingredient } from "../ingredient.model"
import { ShoppingListService } from "../shopping-list.service";

@Component({
    selector: 'app-shopping-edit',
    templateUrl: './shopping-edit.component.html' 
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
    @ViewChild('shoppingForm') shoppingForm: NgForm
    subscription: Subscription
    editMode = false
    editItem: number
    editIngredient: Ingredient

    constructor(private shoppingListService: ShoppingListService) {}

    ngOnInit() {
        this.subscription = this.shoppingListService.editing.subscribe(
            (idx: number) => {
                this.editItem = idx
                this.editMode = true
                this.editIngredient = this.shoppingListService.getIngredientbyId(idx)
                this.shoppingForm.setValue({
                    name: this.editIngredient.name,
                    amount: this.editIngredient.amount
                })
            }
        )
    }

    onAdd(form: NgForm) {
        const ingredientName = form.value.name
        const ingredientAmount = form.value.amount
        const ingredient = new Ingredient(ingredientName, ingredientAmount)
        if (this.editMode) 
            this.shoppingListService.updateIngredient(this.editItem, ingredient)
        else
            this.shoppingListService.addIngredient(ingredient)
        
        this.editMode = false
        this.shoppingForm.reset()
    }

    onClear() {
        this.editMode = false
        this.shoppingForm.reset()
    }

    onDelete() {
        this.shoppingListService.deleteIngredient(this.editItem)
        this.onClear()
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe()
    }
}