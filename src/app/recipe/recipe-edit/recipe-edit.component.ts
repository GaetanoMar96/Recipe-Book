import { Component, OnInit, ViewChild } from "@angular/core";
import { FormArray, FormControl, FormGroup, NgForm, Validators } from "@angular/forms";
import { ActivatedRoute, Params, Router, TitleStrategy } from "@angular/router";
import { Recipe } from "../recipe.model";
import { RecipeService } from "../recipe.service";

@Component({
    selector: 'app-recipe-edit',
    templateUrl: './recipe-edit.component.html' 
}
)
export class RecipeEditComponent implements OnInit{
    id: number
    mode: boolean = false
    recipeForm: FormGroup

    constructor(
        private recipeService: RecipeService,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.route.params.subscribe(
            (params: Params) => {
                this.mode = params['id'] != null
                this.id = +params['id']
                this.formInit()
            }
        )            
    }

    private formInit() {
        let recipeName = ''
        let recipeImage = ''
        let recipeDescription = ''
        let recipeIngredients = new FormArray([])

        if(this.mode) {
            const recipe = this.recipeService.getRecipe(this.id)
            recipeName = recipe.name
            recipeImage = recipe.imagepath
            recipeDescription = recipe.description
            if(recipe['ingredients']) {
                for (let ingredient of recipe.ingredients) {
                    recipeIngredients.push( new FormGroup({
                        'name': new FormControl(ingredient.name, Validators.required),
                        'amount': new FormControl(ingredient.amount, [
                            Validators.required,
                            Validators.pattern(/^[1-9]+[0-9]*$/)
                          ])
                    }))
                }
            }
        }

        this.recipeForm = new FormGroup({
            'name': new FormControl(recipeName, Validators.required),
            'imagepath': new FormControl(recipeImage, Validators.required),
            'description': new FormControl(recipeDescription, Validators.required), 
            'ingredients': recipeIngredients 
        })

    }
    
    get controls() { // a getter!
        return (<FormArray>this.recipeForm.get('ingredients')).controls;
    }

    onSubmit() {
        if (this.mode) {
          this.recipeService.updateRecipe(this.id, this.recipeForm.value);
        } else {
          this.recipeService.addRecipe(this.recipeForm.value);
        }
        this.onCancel();
    }
    
    onAddIngredient() {
        (<FormArray>this.recipeForm.get('ingredients')).push(
            new FormGroup({
                'name': new FormControl(null, Validators.required),
                'amount': new FormControl(null, [
                        Validators.required,
                        Validators.pattern(/^[1-9]+[0-9]*$/)
                ])
            })
        )
    }

    onDeleteIngredient(index: number) {
        (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
    }
    
    onCancel() {
        this.router.navigate(['../'], {relativeTo: this.route});
    }
}