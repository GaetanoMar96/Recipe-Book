import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { ShoppingListService } from "src/app/shopping-list/shopping-list.service";
import { Recipe } from "../recipe.model";
import { RecipeService } from "../recipe.service";

@Component({
    selector: 'app-recipe-detail',
    templateUrl: './recipe-detail.component.html' 
})
export class RecipeDetailComponent implements OnInit {
    @Input() recipeDetail: Recipe;
    id: number

    constructor(
        private recipeService: RecipeService,
        private shoppingService: ShoppingListService,
        private route: ActivatedRoute,
        private router: Router) {}
    
    ngOnInit(): void {
        this.route.params.subscribe(
            (params: Params) => {
                this.id = +params['id']
                this.recipeDetail = this.recipeService.getRecipe(this.id)
            }
        )            
    }

    onEditRecipe() {
        this.router.navigate(['edit'], { relativeTo: this.route})
    }

    // Bridge comunication between recipe and shopping list
    addToShoppingList() {
        this.shoppingService.addIngredients(this.recipeDetail.ingredients)
    }

    onDeleteRecipe() {
        this.recipeService.deleteRecipe(this.id);
        this.router.navigate(['/recipes']);
    }
    
}