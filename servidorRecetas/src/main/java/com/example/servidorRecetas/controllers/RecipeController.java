package com.example.servidorRecetas.controllers;

import com.example.servidorRecetas.services.RecipeService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RecipeController {

    private final RecipeService recipeService;

    public RecipeController(RecipeService recipeService) {
        this.recipeService = recipeService;
    }

    @GetMapping("/fetch-recipes")
    public String fetchRecipes() {
        // Simply call the imperative method without reactive wrapping
        recipeService.fetchAndStoreRecipes();  // This is a blocking call
        return "Recipes fetched and stored successfully";
    }
}
