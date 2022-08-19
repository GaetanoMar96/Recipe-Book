import { Ingredient } from "../shopping-list/ingredient.model"

export class Recipe {
    public name: string
    public description: string
    public imagepath: string
    public ingredients: Ingredient[]

    constructor(name: string, desc: string, path: string, ingredients: Ingredient[]) {
        this.name = name
        this.description = desc
        this.imagepath = path
        this.ingredients = ingredients
    }
}