package com.example.servidorRecetas.services;

import com.example.servidorRecetas.RecipeResponse;
import com.example.servidorRecetas.model.Ingredient;
import com.example.servidorRecetas.model.Recipe;
import com.example.servidorRecetas.repository.IngredientRepository;
import com.example.servidorRecetas.repository.RecipeRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;
import reactor.core.publisher.Flux;

import java.util.*;

@Service
public class RecipeService {

    private final WebClient webClient;
    private final RecipeRepository recipeRepository;
    private final IngredientRepository ingredientRepository;

    @Autowired
    public RecipeService(WebClient webClient, RecipeRepository recipeRepository, IngredientRepository ingredientRepository) {
        this.webClient = webClient;
        this.recipeRepository = recipeRepository;
        this.ingredientRepository = ingredientRepository;
    }

    // Fetch recipes from the external API and save them
    @Transactional
    public void fetchAndStoreRecipes() {
        // Get the recipes from the external API (blocking call for synchronous)
        RecipeResponse response = getRecipesFromApi().block();

        // Iterate through each recipe and save it
        for (Recipe recipe : response.getRecipes()) {
            // Save the recipe first
            Recipe savedRecipe = recipeRepository.save(recipe);

            // Iterate through each ingredient (now using Ingredient objects, not Strings)
            for (Ingredient ingredient : recipe.getIngredients()) {
                // Set the recipe reference for the ingredient
                ingredient.setRecipe(savedRecipe); // Link ingredient to the saved recipe

                // Save the ingredient to the database
                ingredientRepository.save(ingredient);
            }

            // Optional: If you need to associate the ingredients with the recipe after saving them
            savedRecipe.setIngredients(recipe.getIngredients());

            // Save the recipe again if it was modified (e.g., now linked with ingredients)
            recipeRepository.save(savedRecipe);
        }
    }


    // Get recipes from the external API
    private Mono<RecipeResponse> getRecipesFromApi() {
        return webClient.get()
                .uri("/recipes") // This is the endpoint you want to call
                .retrieve()
                .bodyToMono(RecipeResponse.class);  // Deserialize the response into RecipeResponse
    }
}
