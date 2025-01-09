package com.example.servidorRecetas.controllers;

import com.example.servidorRecetas.services.RecipeService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

@RestController
public class RecipeController {

    private final RecipeService recipeService;

    public RecipeController(RecipeService recipeService) {
        this.recipeService = recipeService;
    }

    @GetMapping("/fetch-recipes")
    public Mono<String> fetchRecipes() {
        return recipeService.fetchAndStoreRecipes()
                .then(Mono.just("Recipes fetched and stored successfully"));
    }
}
